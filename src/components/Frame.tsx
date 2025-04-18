"use client";

import { useEffect, useCallback, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { useFrameSDK } from "~/hooks/useFrameSDK";

function DonationCard({ onDonate, onLearnMore, onClose }: { onDonate: (amount: string) => void; onLearnMore: () => void; onClose: () => void }) {
  const [donationAmount, setDonationAmount] = useState("10");
  
  return (
    <Card className="border-2 border-red-500">
      <CardHeader className="bg-red-500 text-white">
        <CardTitle className="text-xl font-bold">Protect Democracy</CardTitle>
        <CardDescription className="text-white text-opacity-90">
          Support the ACLU's fight against constitutional violations
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">
              &quot;No person shall be elected to the office of the President more than twice.&quot;
            </p>
            <p className="text-xs text-gray-500">
              - 22nd Amendment, U.S. Constitution
            </p>
          </div>
          
          <div className="bg-yellow-50 p-2 rounded-md border border-yellow-200">
            <p className="text-sm">
              Trump says he&apos;s considering ways to serve a third term as president.
              The ACLU is working to protect constitutional rights.
            </p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="amount">Donation Amount (ETH)</Label>
            <p className="text-xs text-gray-500 mb-2">Supports cryptocurrency donations via Every.org</p>
            <div className="flex space-x-2">
              {["0.01", "0.05", "0.1"].map((amount) => (
                <Button 
                  key={amount}
                  variant={donationAmount === amount ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setDonationAmount(amount)}
                  className="flex-1"
                >
                  {amount}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          className="w-full bg-red-500 hover:bg-red-600" 
          onClick={() => onDonate(donationAmount)}
        >
          Donate {donationAmount} ETH via Every.org
        </Button>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={onLearnMore}
        >
          Learn More
        </Button>
        <Button 
          variant="ghost" 
          className="w-full text-gray-500 hover:text-gray-700 mt-2" 
          onClick={onClose}
          size="sm"
        >
          Close
        </Button>
      </CardFooter>
    </Card>
  );
}


export default function Frame() {
  const { isSDKLoaded, sdk } = useFrameSDK();

  const handleDonate = useCallback((amount: string) => {
    // Redirect to Every.org's ACLU donation page with the selected amount
    sdk.actions.openUrl(`https://www.every.org/aclu/frame/donate?donationAmount=${amount}&currency=ETH&cause=ACLU&utm_source=frame&utm_medium=frame`);
  }, [sdk]);

  const handleLearnMore = useCallback(() => {
    sdk.actions.openUrl("https://www.every.org/aclu/about?utm_source=frame");
  }, [sdk]);

  const handleClose = useCallback(() => {
    sdk.actions.close();
  }, [sdk]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[300px] mx-auto py-2 px-2">
      <DonationCard 
        onDonate={handleDonate} 
        onLearnMore={handleLearnMore} 
        onClose={handleClose}
      />
    </div>
  );
}
