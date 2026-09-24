"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import FooterSection from "@/components/FooterSection";

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#1E1727] via-[#30253C] to-[#160E21] min-w-full min-h-screen text-white overflow-x-hidden relative">
      {/* Specular Ambient Gradient Blur Orbs */}
      <div className="absolute top-10 left-10 w-[600px] h-[600px] bg-[#39C69C]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[30%] right-0 w-[650px] h-[650px] bg-[#CDA8E8]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[65%] left-10 w-[550px] h-[550px] bg-[#C9A867]/12 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="flex py-4 px-6 md:px-20 justify-between items-center glass-navbar w-full z-50 fixed top-0 left-0 right-0">
        <Link href="/" className="flex items-center gap-3 w-fit group cursor-pointer">
          <div className="rounded-lg bg-[#9875C1] w-8 h-8 flex items-center justify-center font-extrabold text-[#050505] text-xs group-hover:scale-105 transition-transform">
            TCF
          </div>
          <p className="text-white font-winterSolace text-xl tracking-tight">
            The Carcino Foundation
          </p>
        </Link>
        <Link
          href="/"
          className="flex py-2 px-5 items-center gap-2 rounded-full glass-btn-primary text-xs font-bold text-white cursor-pointer hover:scale-105 transition-all shadow-md"
        >
          <span>← Back to Home</span>
        </Link>
      </header>

      {/* Main Privacy Content Container */}
      <main className="flex pt-32 pb-20 px-6 flex-col items-center w-full max-w-4xl mx-auto relative z-10">
        {/* Title Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-14 w-full">
          <span className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-[#E9CDF8] inline-block">
            LEGAL DOCUMENTATION
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-winterSolace text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-[#E9CDF8] font-inter text-sm font-medium">
            Last Updated: 11/03/2026
          </p>
        </div>

        {/* Content Box */}
        <div className="w-full bg-[#120a1c]/80 backdrop-blur-xl border border-white/10 p-8 md:p-14 rounded-3xl shadow-2xl flex flex-col gap-10 text-[#E9CDF8]/90 font-inter text-base leading-relaxed">
          
          {/* Statement */}
          <section className="space-y-4">
            <p>
              The Carcino Foundation values your trust, and we understand the importance of protecting your privacy. We want to make sure that you understand how your information is collected and used by us. This Privacy Statement describes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#E9CDF8]">
              <li>What information we collect about you, including what and how we collect it;</li>
              <li>How we use it;</li>
              <li>With whom we may share it;</li>
              <li>What choices you have regarding our use of your information.</li>
            </ul>
          </section>

          {/* Scope & Consent */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              Services Covered
            </h2>
            <p>
              This statement applies to all information collected by The Carcino Foundation through our &quot;Services,&quot; which include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
                <span className="text-sm font-bold text-white">Direct Communications</span>
                <p className="text-xs text-[#E9CDF8]/80 leading-normal">
                  Any information shared via electronic, written, or oral communication.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
                <span className="text-sm font-bold text-white">Digital Services</span>
                <p className="text-xs text-[#E9CDF8]/80 leading-normal">
                  Data collected through our website, including interactions with integrated Artificial Intelligence (AI) technologies.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
                <span className="text-sm font-bold text-white">Offline & Third-Party Data</span>
                <p className="text-xs text-[#E9CDF8]/80 leading-normal">
                  Information gathered through offline interactions or received from authorized third parties.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#9875C1]/15 border border-[#9875C1]/30 text-xs text-[#E9CDF8]">
              <strong>Your Consent:</strong> By accessing our Services or providing your personal information to us, you acknowledge and agree to the practices outlined in this Privacy Statement.
            </div>
          </section>

          {/* How Data Depends on Interaction */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <p>
              When you engage with The Carcino Foundation we collect a variety of information. In general, the type of information we collect on you will depend on how you choose to interact with The Carcino Foundation. For instance, if you are using our website to gather or search information on cancer related topics we will need a type of information from you.
            </p>
            <p>
              The type of data we collect depends on how you interact with The Carcino Foundation. We collect &quot;Personal Information&quot;, data that identifies you directly or can be linked to you as an individual.
            </p>
          </section>

          {/* Survivors */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              Survivors
            </h2>
            <p>
              Your name, cancer subtype, your story and information that has been made available to us, with your consent, during the interview, is made available publicly on our Site in text form. Slight modifications to the tone of the article is made without altering the content.
            </p>
            <p className="text-sm text-purple-300 font-semibold">
              Personal information are required for organisational documentation only, and are kept confidential.
            </p>
          </section>

          {/* Data Analytics */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              Data Analytics
            </h2>
            <p>
              We use data to evaluate engagement levels with our Site and programs. We also perform data analysis and research activities to gain a greater general understanding of needs of patients, caregivers, audience. This analysis helps us improve experience, support, mission delivery. We do not use automated decision-making without human intervention in an ethical way. When we perform data analytics we may also use information that has been anonymised in a manner that it no longer reveals your specific identity.
            </p>
          </section>

          {/* Internet Protocol Address */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              Internet Protocol Address
            </h2>
            <p>
              Your IP address is automatically assigned to your computer by your Internet Service Provider. An IP address may be identified and logged automatically in our server log files whenever a user accesses the Services, along with the time of visit and the page(s) that were visited. We use IP addresses for purposes such as calculating usage levels, diagnosing server problems, and administering the Services. We may also derive your approximate location from your IP address.
            </p>
          </section>

          {/* Categories of Data */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              Categories of Data
            </h2>
            <ul className="space-y-3">
              <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-white block mb-1">Contact Information:</strong> Such as your name, email address, mailing address, and phone number.
              </li>
              <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-white block mb-1">Demographic Information:</strong> Basic details that help us understand our community (e.g., age or location).
              </li>
              <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-white block mb-1">Health Information:</strong> Information regarding your relationship to cancer, shared voluntarily to help us provide relevant resources.
              </li>
              <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-white block mb-1">Employment Information:</strong> Professional history and qualifications (relevant to staff and volunteers).
              </li>
              <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-white block mb-1">Internet Activity:</strong> Data collected through cookies and tracking technologies regarding how you use our site (unless you choose to opt-out).
              </li>
            </ul>
          </section>

          {/* Image Usage & Licensing */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              Image Usage and Licensing
            </h2>
            <p>
              All images, photographs, illustrations, graphics, and visual media displayed on this website are either the property of the organization, created by members of our team, or obtained through authorized third-party sources and used in accordance with their respective licensing terms.
            </p>
            <p>
              Images owned or created by the organization are protected by applicable copyright and intellectual property laws. Visitors and users of the website are not permitted to be copied, downloaded, reproduced, modified, distributed, transmitted, or otherwise used for commercial or public purposes without prior written permission from the organization or explicit authorization granted by the organization or the respective copyright holder.
            </p>
            <p>
              Certain images used on the website may be sourced from third-party stock image platforms or partner organizations. Such images remain the intellectual property of their respective creators or licensors and are used on this website in compliance with the licensing agreements provided by those platforms. Where required, the license terms, proper attribution or credit is provided to the original creators.
            </p>
          </section>

          {/* User-Submitted Images and Media */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              User-Submitted Images and Media
            </h2>
            <p>
              Certain sections of this website, including blogs, articles, or community submissions, may allow users or contributors to upload and share their own images, photographs, or other visual media.
            </p>
            <p>
              By submitting or uploading images to the website, the user confirms and warrants that they either own the rights to the submitted content or have obtained all necessary permissions from the rightful copyright holder to share and publish the material.
            </p>
            <p>
              The act of uploading such images grants the organization a non-exclusive, royalty-free license to display, reproduce, and publish the submitted content on the website or related platforms for informational, promotional, or educational purposes in connection with the associated blog post, article, or content submission. This permission is granted solely for the purpose of operating, promoting, and displaying the content on the platform.
            </p>
            <p>
              Users remain solely responsible for the images they submit. The organization does not claim ownership of user-submitted images; however, the organization reserves the right to review, remove, or restrict any content that violates copyright laws, intellectual property rights, community guidelines, or applicable regulations.
            </p>
            <p>
              If any third party believes that a user-submitted image infringes upon their intellectual property rights, they may contact the organization using the provided contact information. Upon receiving a valid complaint and verification of such claims, the organization will review the matter and take appropriate action, which may include removal or modification of the disputed content where necessary.
            </p>
          </section>

          {/* How We Collect Information */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              How We Collect Information
            </h2>
            <p>We collect data through several primary channels:</p>
            <ul className="space-y-3">
              <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-white block mb-1">Site Use & Public Forums:</strong> Information provided via our website. <em>(Note: Information posted in public forums becomes public. Please use caution when sharing personal details.)</em>
              </li>
              <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-white block mb-1">Event Registration:</strong> When registering for events, you may share your relationship to cancer (e.g., survivor or caregiver) to help us tailor your experience.
              </li>
              <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-white block mb-1">Employment & Volunteering:</strong> We collect work history and may conduct background checks depending on the role. Generally, collected through our Sign Up forms on the Site.
              </li>
              <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-white block mb-1">Third-Party Partnerships:</strong> We receive information from partners during fundraising campaigns or promotions. This may include donor reports (name, contact info, and donation amount).
              </li>
              <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-white block mb-1">Healthcare provider for campaigns and underprivilege support:</strong> We will require your educational qualification, contact information, employment status, demographic status and/or business contact information through online platforms like Gmail, Whatsapp. For organisational data documentation only.
              </li>
              <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-white block mb-1">Collaborations:</strong> If you partner with The Carcino Foundation to provide services, or help us with our mission, we may collect business information, employer and contact information. If it is necessary for purposes of paying you for services provided, we may also collect bank information, employer, identification number, etc.
              </li>
            </ul>
            <p className="text-xs text-[#E9CDF8]/80 font-medium italic pt-2">
              These information are confidential, and are required only for documentation purposes. No above mentioned categories of data are shared with third parties or public unless stated. No personal information is made public.
            </p>
          </section>

          {/* Data Protection and Security */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              Data Protection and Security
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Technical security measures</li>
              <li>Access to personal data</li>
              <li>Any third-parties that are involved</li>
              <li>How and where data is stored</li>
              <li>User responsibility</li>
            </ul>
          </section>

          {/* Third-Party Sharing */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              Third-Party Sharing
            </h2>
            <p>
              We might use and share your data with third-party organizations we are affiliated with for the purpose of cancer awareness and outreach.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              Cookies and Tracking
            </h2>
            <p>
              A cookie is a small text file that the website you visit sends to your computer. The cookie essentially tracks the user’s behavior on the site.
            </p>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Essential cookies that are stored:</h3>
              <ul className="space-y-3">
                <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <strong className="text-white block mb-1">JWT Auth Cookie:</strong> Personal data, as in, name, profile picture (optional), email address, date of birth, username, phone number, description (optional) and encrypted password data is stored when you sign up to the website. An option is provided to have a private account where the jwt auth cookie won&apos;t be exposed.
                </li>
                <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <strong className="text-white block mb-1">Google OAuth:</strong> Signing up through Google limits the data storage to openid, email and profile (including image and name).
                </li>
              </ul>

              <h3 className="text-lg font-bold text-white pt-2">3rd party cookie that is stored:</h3>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-white block mb-1">Google Analytics (GA4):</strong> Through this, data related to site access, device type, language and accessibility setting of the device, pages visited, buttons clicked, time spent, referrers clicked and traffic source used to enter the website, e.g. social media, direct link, or some other campaigns etc. is taken.
              </div>
              <p className="text-xs text-purple-300 font-semibold italic">
                No sensitive personal health data is tracked through cookies without explicit consent.
              </p>
            </div>
          </section>

          {/* With whom we may share your personal information */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              With Whom We May Share Your Personal Information
            </h2>
            <p className="font-semibold text-white">
              The Carcino Foundation does not sell or share personal information of its constituents.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal Information are shared with campaign volunteers, third party collaborators, service providers, only if/when required. With your consent.</li>
              <li>We may need to share personal information with third parties assisting us with operational services like website hosting, data analytics, email delivery, IT infrastructure.</li>
              <li>Volunteers, Healthcare providers, employees - We may share limited personal information with the internal team assisting our organisation and to collaborating NGOs, Fundraising organisations who require the information as part of their duties. Confidentiality is maintained throughout.</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-2xl font-bold font-winterSolace text-[#9875C1]">
              Your Rights
            </h2>
            <p>
              The Carcino Foundation is an India-based organisation and the rights for users of our website are in line with the rights given to Indians. You have the right to access, to request a copy of, to correct, to opt-out of data sharing, and to delete your Personal Information. We request you to contact us for the same.
            </p>
            <p>
              In case of deletion, some personal information will be retained to document this request.
            </p>
            <p>
              With your consent. In addition to the other uses described in this section, we may also use your information as you expressly authorized us to do so. We will explicitly inform you on the way we use your information.
            </p>
            <p className="text-xs text-purple-300 font-semibold">
              Internal employees have access to organisational data documentation.
            </p>
          </section>

          {/* Contact Us */}
          <section className="space-y-4 p-6 md:p-8 rounded-2xl bg-[#9875C1]/10 border border-[#9875C1]/30">
            <h2 className="text-2xl font-bold font-winterSolace text-white">
              Contact Us
            </h2>
            <p className="text-sm">
              If you have any queries about our privacy policy, or if you wish to update/correct your personal profile or change your communication preferences, please contact us at:
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-2 text-sm font-semibold">
              <a
                href="mailto:carcinofoundation.contact@gmail.com"
                className="text-[#E9CDF8] hover:text-white underline transition-colors"
              >
                ✉️ carcinofoundation.contact@gmail.com
              </a>
              <a
                href="tel:+918777429831"
                className="text-[#E9CDF8] hover:text-white underline transition-colors"
              >
                📞 +91 87774 29831
              </a>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
