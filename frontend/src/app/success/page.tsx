import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";

import ContinueButton from "../components/ContinueButton";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-24 w-24 text-green-600">
            <CheckCircle className="h-full w-full" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-700">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-xl text-gray-600 mb-6">
            Thank you for your purchase. Your transaction has been completed
            successfully.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <ContinueButton />
        </CardFooter>
      </Card>
    </div>
  );
}
