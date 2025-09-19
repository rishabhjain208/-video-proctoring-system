### **README.md: Video Proctoring System**

-----

### **📜 Project Overview**

[cite\_start]This project is a **Video Proctoring System** designed to monitor candidates during online video interviews[cite: 4]. [cite\_start]The system uses computer vision to ensure the integrity of the interview process by detecting two key things: a candidate's focus and the presence of unauthorized items[cite: 5, 6].

The system logs all suspicious events with a timestamp and, at the end of the interview, generates a detailed report. [cite\_start]This report includes a final integrity score based on deductions for each flagged event[cite: 31, 32, 33].

-----

### **🎯 Key Features**

  * [cite\_start]**Real-time Monitoring**: The application analyzes the candidate's video feed in real time for suspicious activity[cite: 11].
  * [cite\_start]**Focus Detection**: The system can detect when a candidate is not looking at the screen for more than 5 seconds or if no face is present for more than 10 seconds[cite: 14, 15]. [cite\_start]It can also detect multiple faces in the frame[cite: 16].
  * [cite\_start]**Object Detection**: It uses models to identify unauthorized items like mobile phones, books, paper notes, or extra electronic devices[cite: 19, 20, 21, 22].
  * [cite\_start]**Event Logging**: All suspicious events are logged with timestamps[cite: 17, 23].
  * [cite\_start]**Comprehensive Reporting**: A **Proctoring Report** is generated after the interview, summarizing the candidate's name, interview duration, and the number of times focus was lost or suspicious events were detected[cite: 28, 29, 30, 31, 32]. [cite\_start]A final integrity score is calculated based on deductions from a starting score of 100[cite: 33].

-----

### **🛠️ Technology Stack**

  * **Frontend**: React.js
  * [cite\_start]**Computer Vision**: TensorFlow.js (for BlazeFace and COCO-SSD models) [cite: 13]
  * **Backend**: Node.js (Express.js)
  * **Database**: MongoDB
  * [cite\_start]**Video Handling**: Multer for video file uploads [cite: 10]

-----

### **📦 Setup and Installation**

Follow these steps to get the project running on your local machine.

#### **Prerequisites**

  * Node.js (v14 or higher)
  * npm or yarn
  * MongoDB installed and running, or a cloud-based MongoDB Atlas instance

#### **1. Clone the Repository**

```bash
git clone https://github.com/rishabhjain208/video-proctoring-system.git
cd video-proctoring-system
```

#### **2. Backend Setup**

Navigate to the `backend` directory and install the required dependencies.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with your MongoDB connection string.

```env
MONGODB_URL=mongodb://127.0.0.1:27017/proctoringdb
PORT=3000
```

Start the backend server.

```bash
npm start
```

The server will run on port `3000` by default.

#### **3. Frontend Setup**

Open a new terminal, navigate to the `frontend` directory, and install the required dependencies.

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory to specify the backend API URL.

```env
VITE_API_BASE=http://localhost:3000/api
```

Start the frontend development server.

```bash
npm run dev
```

The application should now be accessible in your browser at `http://localhost:5173`.

-----

### **🚀 Usage**

1.  **Start Interview**: On the frontend web page, click the **"Start"** button to begin the video session.
2.  **Proctoring**: The system will automatically start analyzing the video feed for suspicious events.
3.  **Stop & Upload**: Click **"Stop & Upload"** to end the interview. This will save the recorded video and all logged events to the backend.
4.  [cite\_start]**View Report**: The backend will process the data and generate a detailed proctoring report, which can be fetched via an API[cite: 26].
