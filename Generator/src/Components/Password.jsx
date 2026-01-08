import {React,useState,useEffect} from 'react'
import './Password.css'

function Password() {
    const[password, setPassword] = useState('')
    const[length, setLength] = useState(16)
    const[includeUppercase, setIncludeUppercase] = useState(true)
    const[includeLowercase, setIncludeLowercase] = useState(true)
    const[includeNumbers, setIncludeNumbers] = useState(true)
    const[includeSymbols, setIncludeSymbols] = useState(true)
    const[strength, setStrength] = useState('')
    const[copied, setCopied] = useState(false)

     function calculateStrength(pwd, len) {
        if (!pwd) return '';
        let score = 0;
        
        if (len >= 16) score += 2;
        else if (len >= 12) score += 1;
        
        if (includeUppercase && includeLowercase) score += 1;
        if (includeNumbers) score += 1;
        if (includeSymbols) score += 2;
        
        if (score <= 2) return 'Weak';
        if (score <= 4) return 'Medium';
        return 'Strong';
     }
     
     function generatePassword() {
        let chars = '';
        if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeNumbers) chars += '0123456789';
        if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        if (chars === '') {
            alert('Please select at least one character type!');
            return;
        }
        
        let generatedPassword = ''; 
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            generatedPassword += chars[randomIndex];
        }
        setPassword(generatedPassword);
        setStrength(calculateStrength(generatedPassword, length));
        setCopied(false);
     }
     
     function copyToClipboard() {
        if (password) {
            navigator.clipboard.writeText(password);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
     }
     
     useEffect(() => {
        generatePassword();
     }, [])
     
  return (
    <>
      {/* Animated Background Orbs */}
      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>
      
      <div className="password-container">
        <div className="container-glow"></div>
        <h1 className="password-title">🔐 Password Generator</h1>
        <p className="subtitle">Generate random, secure passwords instantly</p>
        
        <div className="password-input-wrapper">
            <input 
                type="text" 
                value={password} 
                readOnly 
                placeholder="Your password will appear here"
                className="password-input"
            />
            {strength && (
                <div className={`strength-indicator strength-${strength.toLowerCase()}`}>
                    <span className="strength-text">Strength: {strength}</span>
                </div>
            )}
        </div>
        
        <div className="length-control">
            <label className="length-label">
                Password Length: <strong>{length}</strong>
                <input 
                    type="range" 
                    min="8" 
                    max="32" 
                    value={length} 
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="length-slider"
                />
            </label>
        </div>
        
        <div className="checkbox-group">
            <h3 className="section-title">Customize Your Password</h3>
            <label className="checkbox-label">
                <input 
                    type="checkbox" 
                    checked={includeUppercase} 
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                />
                Uppercase Letters (A-Z)
            </label>
            
            <label className="checkbox-label">
                <input 
                    type="checkbox" 
                    checked={includeLowercase} 
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                />
                Lowercase Letters (a-z)
            </label>
            
            <label className="checkbox-label">
                <input 
                    type="checkbox" 
                    checked={includeNumbers} 
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
                Numbers (0-9)
            </label>
            
            <label className="checkbox-label">
                <input 
                    type="checkbox" 
                    checked={includeSymbols} 
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
                Symbols (!@#$%^&*)
            </label>
        </div>
        
        <div className="button-group">
            <button 
                onClick={generatePassword}
                className="generate-btn"
            >
                Generate Password
            </button>
            
            <button 
                onClick={copyToClipboard}
                disabled={!password}
                className="copy-btn"
            >
                {copied ? '✓ Copied!' : 'Copy to Clipboard'}
            </button>
        </div>
    </div>
    </>
  )
}

export default Password