import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { MapPin, Package, Clock, ChevronRight, Truck, User, LogOut, Phone } from 'lucide-react';

export function HomePage() {
  const { setCurrentPage, isAuthenticated, userType, currentUser, logout } = useStore();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookDelivery = () => {
    if (isAuthenticated && userType === 'customer') {
      setCurrentPage('booking');
    } else {
      setCurrentPage('login');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                SwiftDrop UAE
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  {userType === 'customer' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage('profile')}
                      className="hidden sm:flex"
                    >
                      <User className="w-4 h-4 mr-2" />
                      {currentUser?.name?.split(' ')[0]}
                    </Button>
                  )}
                  {userType === 'driver' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage('admin')}
                      className="hidden sm:flex"
                    >
                      <Truck className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage('login')}
                    className="hidden sm:flex"
                  >
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setCurrentPage('login')}
                    className="gradient-green text-white hover:opacity-90"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6F9F3] text-[#00A67E] text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-[#00D09C] animate-pulse" />
                Fast Delivery Across UAE
              </div>
              
              <h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-tight"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                SwiftDrop{' '}
                <span className="text-[#00D09C]">UAE</span>
              </h1>
              
              <p className="text-lg text-[#666666] max-w-lg">
                Fast, reliable delivery across all Emirates. Book now, track in real-time, 
                and experience premium on-demand logistics in Dubai, Abu Dhabi & beyond.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={handleBookDelivery}
                  className="gradient-green text-white hover:opacity-90 shadow-green px-8"
                >
                  {isAuthenticated && userType === 'customer' ? 'Book Delivery' : 'Get Started'}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection('how-it-works')}
                  className="border-[#E5E5E5] text-[#1A1A1A] hover:bg-gray-50"
                >
                  Learn More
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-2xl font-bold text-[#1A1A1A]">50K+</div>
                  <div className="text-sm text-[#666666]">UAE Deliveries</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1A1A1A]">99%</div>
                  <div className="text-sm text-[#666666]">Satisfaction</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1A1A1A]">45min</div>
                  <div className="text-sm text-[#666666]">Avg. Delivery</div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Map */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
                <img
                  src="/hero-map.jpg"
                  alt="UAE Delivery Map"
                  className="w-full h-auto object-cover"
                />
                {/* Floating Cards */}
                <div className="absolute top-4 left-4 bg-white rounded-xl p-3 shadow-card animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E6F9F3] flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#00D09C]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#1A1A1A]">Live Tracking</div>
                      <div className="text-xs text-[#666666]">All 7 Emirates</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-4 right-4 bg-white rounded-xl p-3 shadow-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-green flex items-center justify-center animate-pulse-green">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#1A1A1A]">On The Way</div>
                      <div className="text-xs text-[#666666]">5 mins away</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll opacity-0">
            <h2 
              className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              How It Works
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              Getting your package delivered across the UAE has never been easier.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Book Your Delivery',
                description: 'Enter pickup and drop-off details across any UAE emirate, select package size, and get instant pricing.',
                image: '/step1-booking.png'
              },
              {
                step: '02',
                title: 'Driver Picks Up',
                description: 'Our certified driver arrives at your location, collects the package, and starts the delivery.',
                image: '/step2-driver.png'
              },
              {
                step: '03',
                title: 'Package Delivered',
                description: 'Track your delivery in real-time across all 7 Emirates and receive confirmation upon delivery.',
                image: '/step3-delivered.png'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="reveal-on-scroll opacity-0 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-[#FAFAFA] rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                  <div className="flex items-center justify-center mb-6">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-32 h-32 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="text-[#00D09C] text-sm font-bold mb-2">{item.step}</div>
                  <h3 className="text-xl font-semibold text-[#1A1A1A] mb-3">{item.title}</h3>
                  <p className="text-[#666666] text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll opacity-0">
            <h2 
              className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Why Choose SwiftDrop UAE?
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              Experience the best delivery service across all Emirates.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'All 7 Emirates',
                description: 'Delivery across Dubai, Abu Dhabi, Sharjah & all Emirates.',
                icon: '/feature-tracking.png'
              },
              {
                title: 'WhatsApp Updates',
                description: 'Get instant notifications via WhatsApp in Arabic & English.',
                icon: '/feature-notifications.png'
              },
              {
                title: 'Secure Handling',
                description: 'Your packages are safe with our trained UAE drivers.',
                icon: '/feature-secure.png'
              },
              {
                title: 'Flexible Scheduling',
                description: 'Deliver now or schedule for later at your convenience.',
                icon: '/feature-scheduling.png'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="reveal-on-scroll opacity-0 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 border border-transparent hover:border-[#00D09C]/20">
                  <div className="flex items-center justify-center mb-4">
                    <img 
                      src={feature.icon} 
                      alt={feature.title}
                      className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2 text-center">{feature.title}</h3>
                  <p className="text-[#666666] text-sm text-center leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Tracking Demo Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-on-scroll opacity-0">
              <h2 
                className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-6"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Track Your Delivery in{' '}
                <span className="text-[#00D09C]">Real-Time</span>
              </h2>
              <p className="text-[#666666] mb-8 leading-relaxed">
                Stay informed every step of the way. Our advanced tracking system lets you 
                follow your package from pickup to delivery anywhere in the UAE. Get live updates, 
                estimated arrival times, and direct communication with your driver.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: MapPin, text: 'Live location updates every 30 seconds' },
                  { icon: Clock, text: 'Instant notifications on status changes' },
                  { icon: Phone, text: 'Direct driver communication' },
                  { icon: Package, text: 'Accurate ETA predictions' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#E6F9F3] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#00D09C]" />
                    </div>
                    <span className="text-[#1A1A1A]">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative reveal-on-scroll opacity-0">
              <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
                <img
                  src="/tracking-map.jpg"
                  alt="Live Tracking UAE"
                  className="w-full h-auto object-cover"
                />
                {/* Status Card */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-card">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src="/driver-avatar.png" 
                      alt="Driver"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium text-[#1A1A1A]">Ahmed Al-Rashid</div>
                      <div className="text-xs text-[#666666]">Motorcycle • Dubai 12345</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#00D09C] animate-pulse" />
                    <span className="text-[#00A67E]">Driver is 5 mins away</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll opacity-0">
            <h2 
              className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              What Our UAE Customers Say
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers across the Emirates have to say.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Fatima Al-Zaabi',
                role: 'Business Owner, Dubai',
                avatar: '/avatar1.jpg',
                rating: 5,
                text: 'SwiftDrop UAE has transformed how we handle deliveries. Fast, reliable, and the real-time tracking is a game-changer for our business!'
              },
              {
                name: 'Mohammed Al-Farsi',
                role: 'Regular Customer, Abu Dhabi',
                avatar: '/avatar2.jpg',
                rating: 5,
                text: 'Best delivery service in the UAE! The drivers are professional and my packages always arrive on time, every time.'
              },
              {
                name: 'Aisha Al-Mansouri',
                role: 'Online Seller, Sharjah',
                avatar: '/avatar3.jpg',
                rating: 5,
                text: 'The WhatsApp notifications keep me updated every step of the way. My customers across the UAE love the transparency!'
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="reveal-on-scroll opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-card-hover">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-[#FFA502] text-[#FFA502]" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#666666] mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-[#1A1A1A]">{testimonial.name}</div>
                      <div className="text-sm text-[#666666]">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gradient-green rounded-3xl p-12 text-center relative overflow-hidden reveal-on-scroll opacity-0">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
            </div>
            
            <div className="relative z-10">
              <h2 
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Ready to Send Your Package?
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                Join thousands of happy customers across the UAE using SwiftDrop. 
                Sign up today and get your first delivery!
              </p>
              <Button
                size="lg"
                onClick={() => setCurrentPage(isAuthenticated ? 'booking' : 'login')}
                className="bg-white text-[#00A67E] hover:bg-gray-100 px-8"
              >
                {isAuthenticated ? 'Book Delivery' : 'Get Started'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-green flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  SwiftDrop UAE
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Fast, reliable delivery across all 7 Emirates. Book now, track in real-time.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#00D09C]">How It Works</button></li>
                <li><button onClick={() => scrollToSection('features')} className="hover:text-[#00D09C]">Features</button></li>
                <li><button onClick={handleBookDelivery} className="hover:text-[#00D09C]">Book Delivery</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setCurrentPage('tracking')} className="hover:text-[#00D09C]">Track Order</button></li>
                <li><button onClick={() => setCurrentPage('login')} className="hover:text-[#00D09C]">Driver Portal</button></li>
                <li><span className="hover:text-[#00D09C]">Contact Us</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +971 4 123 4567
                </li>
                <li>support@swiftdrop.ae</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            © 2024 SwiftDrop UAE. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
