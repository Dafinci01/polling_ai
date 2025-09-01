import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // TODO: Implement actual authentication logic
    // This is a placeholder that simulates a successful login
    
    // For demo purposes only
    if (email === "user@example.com" && password === "password") {
      return NextResponse.json(
        { 
          success: true, 
          user: { 
            id: "1", 
            name: "Demo User", 
            email: "user@example.com" 
          } 
        },
        { status: 200 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}