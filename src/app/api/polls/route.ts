import { NextResponse } from "next/server";

// GET all polls
export async function GET() {
  try {
    // TODO: Implement actual database query
    // This is placeholder data
    const polls = [
      {
        id: "1",
        title: "Favorite Programming Language",
        description: "What's your favorite programming language?",
        options: [
          { id: "1", text: "JavaScript", votes: 42 },
          { id: "2", text: "Python", votes: 35 },
          { id: "3", text: "TypeScript", votes: 28 },
          { id: "4", text: "Java", votes: 15 },
        ],
        createdBy: "1",
        createdAt: "2023-06-15T10:00:00Z",
      },
      {
        id: "2",
        title: "Best Frontend Framework",
        description: "Which frontend framework do you prefer?",
        options: [
          { id: "1", text: "React", votes: 50 },
          { id: "2", text: "Vue", votes: 30 },
          { id: "3", text: "Angular", votes: 20 },
          { id: "4", text: "Svelte", votes: 15 },
        ],
        createdBy: "2",
        createdAt: "2023-06-10T14:30:00Z",
      },
    ];

    return NextResponse.json({ polls }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch polls" },
      { status: 500 }
    );
  }
}

// POST create a new poll
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, options } = body;

    // TODO: Implement actual database insertion
    // This is a placeholder that simulates creating a poll

    const newPoll = {
      id: Date.now().toString(),
      title,
      description,
      options: options.map((option: string, index: number) => ({
        id: (index + 1).toString(),
        text: option,
        votes: 0,
      })),
      createdBy: "1", // Assuming user with ID 1 is creating the poll
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ poll: newPoll }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create poll" },
      { status: 500 }
    );
  }
}