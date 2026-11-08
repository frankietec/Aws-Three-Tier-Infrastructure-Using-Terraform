const express = require("express");
const app = express();
const db = require("./models");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const projectRoutes = require("./routes/projectRoutes");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./utils/logger");
const { swaggerUi, swaggerSpec } = require("./swagger");
const morgan = require("morgan");
const helmet = require("helmet"); // Добавляем helmet
const cors = require("cors"); // Добавляем CORS

// Middleware
app.use(express.json());

// Настройка CORS - ДОЛЖНО БЫТЬ ПЕРЕД helmet!
// Handle CORS_ORIGIN - can be "*", specific URL, or comma-separated list
const allowedOrigins = (process.env.CORS_ORIGIN && process.env.CORS_ORIGIN.trim())
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim()).filter(o => o.length > 0)
  : ["*"];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    
    // Allow all origins if CORS_ORIGIN is "*"
    if (allowedOrigins.includes("*")) {
      return callback(null, true);
    }
    
    // Check if origin is in allowed list or matches pattern
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      // Exact match
      if (allowedOrigin === origin) return true;
      // Pattern match for wildcard domains (e.g., *.onrender.com)
      if (allowedOrigin.startsWith('*.')) {
        const domain = allowedOrigin.slice(2); // Remove '*.'
        // Ensure origin is https:// and ends with the domain
        if (origin.startsWith('https://') && origin.endsWith('.' + domain)) {
          // Extract hostname from origin (remove https://)
          const hostname = origin.slice(8).split('/')[0];
          // Ensure exactly one subdomain level (prevent evil.onrender.com.malicious.com)
          const parts = hostname.split('.');
          const domainParts = domain.split('.');
          // hostname should have exactly one more part than domain
          return parts.length === domainParts.length + 1 && hostname.endsWith('.' + domain);
        }
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow credentials
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions)); // Используем CORS middleware

// Безопасность заголовков с helmet
app.use(helmet());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    // Если возникла ошибка парсинга JSON
    console.error("Ошибка парсинга JSON:", err.message);
    return res.status(400).json({
      error: "Некорректный JSON в запросе",
    });
  }
  next();
});

// Логирование HTTP-запросов
app.use(morgan("combined"));

// Swagger документация
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

// Маршрут для выдачи JSON спецификации
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Health check endpoint for Docker
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Маршруты
app.use(authRoutes);
app.use(userRoutes);
app.use(notificationRoutes);
app.use(projectRoutes);

// Обработчик ошибок
app.use(errorHandler);

// Логирование текущего окружения и порта
console.log(`Текущее окружение: ${process.env.NODE_ENV}`);
console.log(`Используемый порт: ${process.env.PORT || 3000}`);

// Получение публичного URL из переменной окружения или использование localhost как резервный вариант
const publicUrl =
  process.env.PUBLIC_URL || `http://localhost:${process.env.PORT || 3000}`;

// Authenticate database connection and start server (except in test mode)
if (process.env.NODE_ENV !== "test") {
  (async () => {
    try {
      await db.sequelize.authenticate();
      console.log("Database connection successful.");

      const port = process.env.PORT || 3000;

      app.listen(port, () => {
        console.log(`Server started on port ${port}`);
        console.log(`OpenAPI available at ${publicUrl}/api-docs`);
      });
    } catch (err) {
      console.error("Application startup failed:", err);
      logger.error("Application startup failed:", err);
      process.exit(1);
    }
  })();
}

module.exports = app;
