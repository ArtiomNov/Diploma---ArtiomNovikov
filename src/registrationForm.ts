export class RegistrationForm {
    private email: string;
    private password: string;
    private username: string;
    private age: number;
    private termsAgreement: boolean = false;
    private registered: boolean = false;
    
    constructor(email: string, password: string, username: string, age: number) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.age = age;
    }

    get Email() {
        return this.email; 
    }

    get Password() {
        return this.password;
    }

    get Username() {
        return this.username; 
    }

    get Age() {
        return this.age; 
    }

    get TermsAgreement() {
        return this.termsAgreement; 
    }

    get Registered() {
        return this.registered;
    }

    setEmail(email: string): void {
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailFormat.test(email)) {
            this.email = email;
        } else {
            throw new Error("Invalid email format");
        }
    }

    setPassword(password: string): void {
        if (password.length >= 8 && /\d/.test(password)) {
            this.password = password;
        } else {
            throw new Error("Minimum lenght is 8 characters and at least 1 digit must be provided");
        }
    }

    setUsername(username: string): void {
        if (username.trim() !== "") {
            this.username = username;
        } else {
            throw new Error("Username can not be empty");
        }
    }

    setAge(age: number): void {
        if (age > 0 && age < 150) {
            this.age = age;
        } else {
            throw new Error("Invalid age provided");
        }
    }
    
    agreeWithTerms(): void {
        this.termsAgreement = true;
    }

    register(): string {
        if (this.email && this.password && this.username && this.age && this.termsAgreement) {
            this.registered = true;
            const registrationDate = new Date().toLocaleString();
            return `Registration is successfull and registration date is: ${registrationDate}`;
        } else {
            let errorMessage = "Registration failed:";
            if (!this.email) errorMessage += "\n- Incorrect Email";
            if (!this.password) errorMessage += "\n- Incorrect Password";
            if (!this.username) errorMessage += "\n- Incorrect Username";
            if (!this.age) errorMessage += "\n- Incorrect Age";
            if (!this.termsAgreement) errorMessage += "\n- T&C are not accepted";
            return errorMessage;
        }
    }
}
