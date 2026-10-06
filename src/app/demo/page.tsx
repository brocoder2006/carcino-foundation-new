import SmoothScrollHero from "@/components/ui/smooth-scroll-hero";

const DemoOne = () => {
    return (
        <div className="relative min-h-screen">
            <SmoothScrollHero
                scrollHeight={1500}
                desktopImage="https://images.unsplash.com/photo-1606787994998-e7c6b9b3f3f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                mobileImage="https://images.unsplash.com/photo-1517315003504-d57630768e1a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                initialClipPercentage={25}
                finalClipPercentage={75}
            />
        </div>
    );
};

export default DemoOne;
