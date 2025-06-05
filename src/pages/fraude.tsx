import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EthlyFiPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center space-y-20 bg-[#CDE8E5] px-4 py-10 md:px-8 lg:px-20">
        {/* Hero Section */}
        <section className="mt-20 w-full space-y-6 text-center">
          <h1 className="text-sm font-semibold text-purple-600">
            First Ever Accepted Blockchain 🔥
          </h1>
          <h2 className="text-4xl font-bold leading-tight text-[#4D869C] md:text-5xl">
            The First ETH Pegged Stablecoin
          </h2>
          <p className="text-lg text-[#4D869C]">
            Leverage ETH's value and earn ETH yield at the same time
          </p>
          <Button className="mt-4 bg-[#244d7fdd]">Launch App</Button>
          {/* Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <Card className="w-40 bg-[#EEF7FF] text-center">
              <CardContent className="space-y-2 pt-6">
                <p className="text-lg font-bold">$342,089,108</p>
                <p className="text-sm text-muted-foreground">
                  Total Collateral
                </p>
              </CardContent>
            </Card>
            <Card className="w-40 bg-[#EEF7FF] text-center">
              <CardContent className="space-y-2 pt-6">
                <p className="text-lg font-bold">342,089,108</p>
                <p className="text-sm text-muted-foreground">Total Supply</p>
              </CardContent>
            </Card>
            <Card className="w-40 bg-[#EEF7FF] text-center">
              <CardContent className="space-y-2 pt-6">
                <p className="text-lg font-bold">18%</p>
                <p className="text-sm text-muted-foreground">Yield APR</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What is Ethly.Fi */}
        <section className="w-full space-y-4 text-center">
          <h2 className="text-3xl font-bold text-[#4D869C]">
            What is Ethly.Fi?
          </h2>
          <p className="text-lg text-[#4D869C]">
            Ethly.Fi is a decentralized protocol that allows users to mint a
            stablecoin pegged to the value of ETH while earning yield at the
            same time.
          </p>
        </section>

        {/* Primary Features */}
        <section className="w-full space-y-6">
          <h2 className="text-center text-2xl font-bold text-[#4D869C]">
            Primary Features
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="text-center">
              <CardContent className="space-y-2 pt-6">
                <h3 className="text-lg font-semibold text-[#4D869C]">
                  ETH-Pegged Stablecoin
                </h3>
                <p className="text-sm text-muted-foreground">
                  Stable value backed by real ETH collateral.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="space-y-2 pt-6">
                <h3 className="text-lg font-semibold text-[#4D869C]">
                  Low Risk
                </h3>
                <p className="text-sm text-muted-foreground">
                  Fully decentralized and transparently audited system.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="space-y-2 pt-6">
                <h3 className="text-lg font-semibold text-[#4D869C]">
                  Eth Yield
                </h3>
                <p className="text-sm text-muted-foreground">
                  Earn ETH-based yield while holding your assets.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How to Leverage Yield */}
        <section className="w-full space-y-6 text-center">
          <h2 className="text-2xl font-bold">How to Leverage Yield?</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              "Deposit collateral",
              "Mint eETH",
              "Redeem eETH for rewards",
              "Repeat all steps",
            ].map((step, index) => (
              <Card key={index} className="text-center">
                <CardContent className="space-y-2 pt-6">
                  <h3 className="text-lg font-semibold">{step}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Strategic Collaborations */}
        <section className="w-full space-y-6 text-center">
          <h2 className="text-2xl font-bold">Strategic Collaborations</h2>
          <p className="text-muted-foreground">
            Partnered with trusted projects and companies in blockchain
            ecosystem.
          </p>
          {/* Placeholder Logos */}
          <div className="flex flex-wrap justify-center gap-8">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="h-10 w-24 rounded-md bg-gray-100" />
            ))}
          </div>
        </section>

        {/* Your Safety Priority */}
        <section className="w-full space-y-6 text-center">
          <h2 className="text-2xl font-bold text-blue-600">
            Your Safety, Our Priority
          </h2>
          {/* Placeholder Auditors */}
          <div className="flex flex-wrap justify-center gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-8 w-20 rounded-md bg-gray-100" />
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full">
          <h2 className="mb-6 text-center text-2xl font-bold">
            Ask Us Anything
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is the Ethly Protocol?</AccordionTrigger>
              <AccordionContent>
                Ethly is a decentralized stablecoin protocol enabling users to
                mint and earn yield from ETH-pegged assets.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How does it work?</AccordionTrigger>
              <AccordionContent>
                Users deposit ETH, mint stablecoins, and automatically earn
                ETH-based rewards.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Where to redeem eETH?</AccordionTrigger>
              <AccordionContent>
                You can redeem eETH on decentralized exchanges and within the
                EthlyFi app anytime.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
      <Footer />
    </>
  );
}
