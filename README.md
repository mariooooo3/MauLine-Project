# 🚗 MauLine – Advanced Java OOP Project

This project simulates a complete Uber-like system implemented in Java, showcasing advanced Object-Oriented Programming concepts and multiple design patterns: **Strategy**

[Image of Strategy Design Pattern]
, **Observer**, and **Visitor**.
It includes Riders, Drivers, a flexible Payment System, real-time notifications, statistics generation, reward management, and automated testing.

---

## 🏗️ **Project Architecture Overview**

The project is organized into modular packages under `src/`, structured around key functionalities and design patterns.

| Nr. | Module Title | Location | Core Functionality |
| :---: | :--- | :--- | :--- |
| **1** | **Entities** | [`src/Entitati`](src/Entitati) | Core domain classes: `Account`, `Driver`, and `Rider`. |
| **2** | **Exceptions** | [`src/Exceptions`](src/Exceptions) | Custom exceptions for robust payment handling (`CashException`, `VoucherException`, etc.). |
| **3** | **Observer Pattern** | [`src/Observer`](src/Observer) | Implements real-time notifications (`Subject`, `RidesObserver`). |
| **4** | **Payment Strategy** | [`src/PaymentStrategy`](src/PaymentStrategy) | Dynamic payment method selection using the **Strategy Pattern**. |
| **5** | **RateUp System** | [`src/RateUpSystem`](src/RateUpSystem) | Manages rating improvements, rewards, and incentives. |
| **6** | **Ride Types** | [`src/Rides`](src/Rides) | Different ride types: *Regular, Economic, Comfort*. |
| **7** | **Main Application** | [`src/MauLine`](src/MauLine) | Core control logic, JSON initialization, and **JUnit** testing. |
| **8** | **Visitor Pattern** | [`src/Visitor`](src/Visitor) | Generates statistics and notifications without modifying entity classes. |

---

## 📝 **Key Features**

* 🔔 **Observer Pattern:** Enables real-time notifications to users.
* 🧾 **Visitor Pattern:** Used for analytics (financial/general) and custom notifications.
* 💳 **Strategy Pattern:** Allows flexible runtime selection of payment methods.
* 🧪 **Testing:** Automated testing using **JUnit**.
* 📂 **Data Handling:** Supports JSON-based initialization of drivers and riders.

---

## 📚 **Technologies & Concepts Used**

* **Java OOP** (Inheritance, Polymorphism, Encapsulation)
* **Design Patterns**: Strategy, Observer, Visitor
* **Unit Testing** (JUnit)
* **Modular Architecture**

---

## 🎯 **Project Purpose**

This project demonstrates clean object-oriented design, modular architecture, and the effective integration of advanced design patterns into a cohesive and functional system.