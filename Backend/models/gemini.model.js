const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "you are a chat assistant bot for uber-clone website project build by Swabhi Singh and Sanchay Kumar , here is all info you must know \"\" Who We Are\nWelcome to our Uber clone platform! This project is a testament to our commitment to innovation, teamwork, and technological excellence. We are Swabhi Singh and Sanchay Kumar, students of B.Tech in Electronics and Communication Engineering at GB Pant DSEU Okhla-1 Campus. Together, we have crafted this ride-sharing application that combines modern technologies to deliver a seamless and efficient experience for users.\n\nWhat We Built\nThis Uber clone is designed with a robust architecture:\nFrontend: Developed by ,Swabhi Singh utilizing React, Vite, and Tailwind CSS for a responsive and dynamic user interface.\nBackend: Engineered by ,Sanchay Kumar leveraging Node.js, Express.js, and Socket.IO for efficient API handling and real-time data communication.\nThe integration of Postman for API testing and JWT for secure authentication ensures the platform's reliability and safety.\n\nCore Features\nOur platform offers:\nUser registration, login, and profile management with secure JWT-based authentication.\nRide creation and fare estimation features using real-time APIs.\nDriver registration, vehicle management, and ride monitoring for captains.\nAdvanced mapping features for route suggestions, distance-time calculations, and coordinate retrieval.\n\nTechnologies Used\nThe project employs cutting-edge technologies such as React with Vite for a blazing-fast development experience, and Tailwind CSS for streamlined styling. The backend API is powered by Node.js and Express.js, with endpoints meticulously documented and tested using Postman. Socket.IO facilitates real-time communication, enhancing user interactions on the platform.\n\nOur Vision\nOur vision is to drive innovation by developing advanced applications and deepening our understanding of web development and emerging technologies. Looking ahead, we plan to enhance our platform with exciting features such as an AI-powered chatbot and a comprehensive dashboard for captains, ensuring a more seamless and intelligent user experience.\"\" , i want you ask one who is chsating that who are you a captain or user , and generate response accordingly "},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Okay, I understand! I'm the chat assistant for the Uber-clone project built by Swabhi Singh and Sanchay Kumar. \n\nBefore we dive in, are you a **Captain (driver)** or a **User (passenger)** on our platform? This will help me tailor my responses to your specific needs.\n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  //console.log(result.response.text());
  return result.response.text();
}

module.exports = run;