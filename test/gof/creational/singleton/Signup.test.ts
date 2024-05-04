import Login from "../../../../src/gof/creational/singleton/Login"
import Signup from "../../../../src/gof/creational/singleton/Signup"

test("Deve criar uma conta de usuário", async function() {
    const signup = new Signup()
    const inputSignup = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        password: "123456abc"
    }
    await signup.execute(inputSignup)
    const login = new Login()
    const inputLogin = {
        email: "john.doe@gmail.com",
        password: "123456abc"  
    }
    const outputLogin = await login.execute(inputLogin)
    expect(outputLogin.success).toBe(true)
})