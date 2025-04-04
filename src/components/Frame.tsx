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

function DonationCard({ onDonate, onLearnMore }: { onDonate: (amount: string) => void; onLearnMore: () => void }) {
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
          Donate {donationAmount} ETH to ACLU
        </Button>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={onLearnMore}
        >
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
}

function ThankYouCard({ onClose }: { onClose: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thank You!</CardTitle>
        <CardDescription>
          Your support helps the ACLU defend constitutional rights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          The ACLU dares to create a more perfect union — beyond one person, party, or side. 
          Their mission is to realize the promise of the United States Constitution for all 
          and expand the reach of its guarantees.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onClose} className="w-full">Close</Button>
      </CardFooter>
    </Card>
  );
}

export default function Frame() {
  const { isSDKLoaded, sdk } = useFrameSDK();
  const [showThankYou, setShowThankYou] = useState(false);

  const handleDonate = useCallback((amount) => {
    // In a real implementation, this would connect to a wallet and process the transaction
    // For this prototype, we'll just show the thank you screen
    setShowThankYou(true);
    
    // In a real implementation, you would use something like:
    // sdk.actions.tx({
    //   to: "0xACLU_WALLET_ADDRESS",
    //   value: ethers.utils.parseEther(amount),
    // });
  }, []);

  const handleLearnMore = useCallback(() => {
    sdk.actions.openUrl("https://www.every.org/aclu");
  }, [sdk]);

  const handleClose = useCallback(() => {
    sdk.actions.close();
  }, [sdk]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[300px] mx-auto py-2 px-2">
      {showThankYou ? (
        <ThankYouCard onClose={handleClose} />
      ) : (
        <DonationCard onDonate={handleDonate} onLearnMore={handleLearnMore} />
      )}
    </div>
  );
}
