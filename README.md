# FinQuest - Learn, Invest, and Grow Smartly

A comprehensive financial education web application designed for Indian students and beginners to learn about investing, stock markets, and financial literacy.

## 🚀 Features

### 1. Authentication System
- Email/Password authentication
- Google OAuth integration
- Facebook OAuth integration
- Session management with Firebase
- User profile initialization with ₹10,000 virtual money

### 2. Interactive Dashboard
- Animated hero section with India map and financial icons
- Real-time statistics counters
- Quick navigation to all features
- User progress tracking

### 3. Learn Section
- Financial literacy modules (Saving vs Investing, Compounding, etc.)
- Indian financial institutions (RBI, SEBI, Banks)
- Interactive charts and simulations
- Tamil tooltips for better understanding
- Investment growth simulator with dynamic sliders

### 4. Virtual Portfolio Simulator
- Grow app-style interface
- Virtual trading with realistic NSE/BSE stocks
- Multiple asset types: Stocks, Mutual Funds, Gold, Fixed Deposits
- Real-time portfolio tracking with simulated returns
- Interactive charts for portfolio growth and allocation
- Transaction history and profit/loss tracking

### 5. Goal Tracker
- Create and manage financial goals
- Progress visualization with color-coded indicators
- Category-based goals (House, Car, Education, etc.)
- Monthly contribution tracking
- Interactive progress updates

### 6. Scam Awareness Center
- Comprehensive information on financial frauds
- Interactive charts showing scam statistics
- Protection tips with Tamil translations
- Emergency contact information
- Red flag identification guides

## 🛠 Tech Stack

- **Frontend**: React 18, Tailwind CSS
- **Backend**: Firebase (Auth, Firestore)
- **Charts**: Chart.js with React-ChartJS-2
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Hosting**: Firebase Hosting (recommended)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd FinIQ
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password, Google, Facebook)
   - Create a Firestore database
   - Update `src/utils/firebase.js` with your Firebase config

4. Start the development server:
```bash
npm start
```

## 🔧 Firebase Configuration

Update the Firebase configuration in `src/utils/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## 📊 Database Structure

### Users Collection
```javascript
{
  name: string,
  email: string,
  virtualBalance: number,
  portfolio: [
    {
      id: number,
      assetType: string,
      assetName: string,
      investedAmount: number,
      currentValue: number,
      profitLoss: number,
      investmentDate: string,
      quantity: number
    }
  ],
  goals: [
    {
      id: number,
      goalName: string,
      targetAmount: number,
      savedAmount: number,
      monthlyContribution: number,
      targetDate: string,
      category: string,
      createdAt: string
    }
  ],
  createdAt: timestamp,
  lastLogin: timestamp,
  totalInvested: number,
  totalReturns: number
}
```

## 🎯 Key Features Implementation

### Virtual Portfolio Simulation
- Real-time return simulation for different asset types
- Stocks: ±3% daily variation
- Mutual Funds: ±1% daily variation
- Gold: ±1% daily variation
- Fixed Deposits: ~7% annual (0.02% daily)

### Goal Tracking System
- Visual progress indicators with color coding
- Red: <50% progress
- Yellow: 50-80% progress
- Green: >80% progress

### Educational Content
- Bilingual support (English + Tamil transliteration)
- Interactive charts and simulations
- Real-world examples and case studies

## 🚀 Deployment

### Firebase Hosting
1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project:
```bash
firebase init hosting
```

4. Build and deploy:
```bash
npm run build
firebase deploy
```

## 🔒 Security Features

- Firebase Authentication for secure user management
- Session persistence with localStorage
- Input validation and sanitization
- Error handling for all API calls
- Secure Firestore rules (implement based on requirements)

## 📱 Responsive Design

- Mobile-first approach
- Responsive navigation with mobile menu
- Touch-friendly interactive elements
- Optimized charts for mobile viewing

## 🎨 UI/UX Features

- Smooth animations with Framer Motion
- Hover effects and micro-interactions
- Color-coded profit/loss indicators
- Gamified visual feedback
- Clean, modern design inspired by Grow/Zerodha

## 🔮 Future Enhancements

- Gamification system with badges and achievements
- Leaderboard for top virtual investors
- Advanced portfolio analytics
- Social features and sharing
- Push notifications
- Advanced charting tools
- SIP simulation
- Tax calculation tools

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and queries, please contact the development team or create an issue in the repository.

---

**FinQuest** - Empowering financial literacy for the next generation of Indian investors! 🇮🇳💰📈