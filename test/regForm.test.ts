import { RegistrationForm } from "../src/registrationForm";

describe("Registration Form tests", () => {
    let registrationform: RegistrationForm;
    
    beforeEach(() => {
        registrationform = new RegistrationForm("test@gmail.com", "password123", "testuser", 25);
    });

    test("Check email validation", () => {
        registrationform.setEmail("art@gmail.com");
        expect(registrationform.Email).toEqual("art@gmail.com");
    });

    test("Empty email field", () => {
        expect(() => {
            registrationform.setEmail(" ");
        }).toThrow("Invalid email format");
    });
    
    test("Check password validation", () => {
        registrationform.setPassword("2024Newpassword");
        expect(registrationform.Password).toEqual("2024Newpassword");
    });

    test("Check wrong password", () => {
        expect(() => {
            registrationform.setPassword("2024");
        }).toThrow("Minimum lenght is 8 characters and at least 1 digit must be provided");
    });

    test("Check user name", () => {
        registrationform.setUsername("Art");
        expect(registrationform.Username).toEqual("Art");
    });

    test("Check empty user name field", () => {
        expect(() => {
            registrationform.setUsername(" ");
        }).toThrow("Username can not be empty");
    });

    test("Check age validation", () => {
        registrationform.setAge(50);
        expect(registrationform.Age).toEqual(50);
    });

    test("Check wrong password", () => {
        expect(() => {
            registrationform.setAge(150);
        }).toThrow("Invalid age provided");
    });

    test("Check method sets termsAgreement to true", () => {
        expect(registrationform.TermsAgreement).toBe(false);
        registrationform.agreeWithTerms();
        expect(registrationform.TermsAgreement).toBe(true);
    });

    test("Register method successfully registers user and sets registered to true", () => {
        registrationform.setEmail("art@gmail.com");
        registrationform.setPassword("2024Newpassword");
        registrationform.setUsername("Art");
        registrationform.setAge(50);
        registrationform.agreeWithTerms();
        const registrationMessage = registrationform.register();
        expect(registrationMessage).toContain("Registration is successfull");
        expect(registrationform.Registered).toBe(true);
    });

    test("Register method with no terms agreement", () => {
        registrationform.setEmail("art@gmail.com");
        registrationform.setPassword("2024Newpassword");
        registrationform.setUsername("Artiom");
        registrationform.setAge(50);
        const registrationMessage = registrationform.register();
        expect(registrationform.Registered).toEqual(false);
        expect(registrationMessage).toEqual("Registration failed:\n- T&C are not accepted");
    });

    test("Registration with no password but valid data", () => {
        registrationform.setEmail("test@test.com");
        registrationform.setUsername("UserTest2024");
        registrationform.setAge(30);
        registrationform.agreeWithTerms();
        const registrationMessage = registrationform.register();
        expect(registrationMessage).toContain("Registration is successfull");
        expect(registrationform.Registered).toBeTruthy();
    });

    test("Registration with minimum valid data", () => {
        registrationform.agreeWithTerms();
        expect(registrationform.register()).toContain("Registration is successfull");
        expect(registrationform.Registered).toBeTruthy();
    });

    test("Registratiom with empty username", () => {
        registrationform.setUsername("1");
        const registrationMessage = registrationform.register();
        expect(registrationform.Registered).toBeFalsy();
        expect(registrationMessage).toContain("Registration failed");
    });

    test("Check boundary values", () => {
        registrationform.setEmail("t@t.com");
        registrationform.setPassword("1234Pass");
        registrationform.setUsername("Test");
        registrationform.setAge(149);
        registrationform.agreeWithTerms();
        const registrationMessage = registrationform.register();
        expect(registrationMessage).toContain("Registration is successfull");
        expect(registrationform.Registered).toBeTruthy();
    });

});