import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XCircle, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function PaymentFailure() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-24 w-24 text-red-600">
            <XCircle className="h-full w-full" />
          </div>
          <CardTitle className="text-3xl font-bold text-red-700">
            Payment Failed
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-xl text-gray-600 mb-6">
            We're sorry, but your payment could not be processed at this time.
          </p>
          <p className="text-gray-600">
            Please check your payment details and try again, or contact our
            support team for assistance.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Link href="/checkout" passHref>
            <Button className="bg-red-600 hover:bg-red-700 text-white text-lg py-2 px-6">
              Try Again
              <RefreshCcw className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
