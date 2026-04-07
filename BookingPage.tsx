@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');

@layer base {
  :root {
    --background: 0 0% 98%;
    --foreground: 0 0% 10%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 10%;
    --primary: 160 100% 41%;
    --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 96%;
    --secondary-foreground: 0 0% 10%;
    --muted: 0 0% 96%;
    --muted-foreground: 0 0% 40%;
    --accent: 160 100% 41%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 0 0% 90%;
    --input: 0 0% 90%;
    --ring: 160 100% 41%;
    --radius: 0.75rem;
    
    --green-primary: #00D09C;
    --green-dark: #00A67E;
    --green-light: #E6F9F3;
    --black: #000000;
    --white: #FFFFFF;
    --gray-bg: #FAFAFA;
    --text-primary: #1A1A1A;
    --text-secondary: #666666;
    --border-color: #E5E5E5;
    --error: #FF4757;
    --pending: #FFA502;
    --success: #00D09C;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-background text-foreground antialiased;
    font-family: 'Inter', sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  .gradient-green {
    background: linear-gradient(135deg, var(--green-primary) 0%, var(--green-dark) 100%);
  }
  .shadow-green {
    box-shadow: 0 4px 20px rgba(0, 208, 156, 0.3);
  }
  .shadow-card {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }
  .shadow-card-hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
  .animate-pulse-green {
    animation: pulse-green 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  @keyframes pulse-green {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(0, 208, 156, 0.4);
    }
    50% {
      box-shadow: 0 0 0 12px rgba(0, 208, 156, 0);
    }
  }
  .animate-slide-up {
    animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fade-in 0.4s ease-out forwards;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .animate-scale-in {
    animation: scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  @keyframes scale-in {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  .glass-effect {
    backdrop-filter: blur(12px);
    background: rgba(255, 255, 255, 0.9);
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Status badge colors */
.status-pending {
  @apply bg-amber-50 text-amber-600 border-amber-200;
}
.status-accepted {
  @apply bg-blue-50 text-blue-600 border-blue-200;
}
.status-delivered {
  @apply bg-emerald-50 text-emerald-600 border-emerald-200;
}
.status-rejected {
  @apply bg-red-50 text-red-600 border-red-200;
}
