import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Polling App - Home",
  description: "Create and vote on polls",
};

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Welcome to Polling App</h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Create and share polls with your friends, colleagues, or the world. Get instant results and insights.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          <Card>
            <CardHeader>
              <CardTitle>Create Polls</CardTitle>
              <CardDescription>Design custom polls with multiple options</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Create polls on any topic with customizable options. Share them easily with anyone.</p>
            </CardContent>
            <CardFooter>
              <Link href="/polls/create" className="w-full">
                <Button className="w-full">Create a Poll</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Vote on Polls</CardTitle>
              <CardDescription>Participate in existing polls</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Browse and vote on polls created by other users. See results in real-time.</p>
            </CardContent>
            <CardFooter>
              <Link href="/polls" className="w-full">
                <Button className="w-full" variant="outline">View Polls</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/auth/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/auth/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}