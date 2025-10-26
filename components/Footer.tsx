import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-(--foreground) text-white pt-16 pb-8 rounded-t-3xl">
      {/* Inner container for content width and padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter signup section with light lime background and rounded corners */}
        <div className="bg-(--main-accent) rounded-3xl p-8 text-green-900 mb-8">
          {/* Flexible row for newsletter content, stacks on mobile, side-by-side on large screens */}
          <div className="flex flex-col lg:flex-row justify-between items-start">
            {/* Left column: Heading and description */}
            <div className="mb-6 pr-2 lg:mb-0 lg:w-1/2">
              <h3 className="text-4xl font-bold mb-2">Razem mamy siłę</h3>
              <div className="text-base">Zapisz się do newslettera Dzieciństwo Bez Smartfona, jeśli chcesz otrzymywać inspirujące historie, pomocne zasoby i aktualności naszego ruchu.</div>
            </div>
            {/* Right column: Signup form */}
            <div className="pl-2 lg:w-1/2">
              <form
                id="wf-form-Newsletter-footer"
                name="wf-form-Newsletter-footer"
                data-name="Newsletter-footer"
                action=""
                method="get"
                className="flex flex-col space-y-4"
                aria-label="Newsletter-footer"
              >
                <input
                  className="bg-(--background) placeholder-gray-500 rounded-full p-4 text-(--foreground) border-none"
                  maxLength={256}
                  name="Email"
                  data-name="Email"
                  placeholder="Email"
                  type="email"
                  id="Email"
                  required
                />
                <input
                  type="submit"
                  data-wait="Zaczekaj chwilę..."
                  className="bg-(--foreground) text-white rounded-full p-4 cursor-pointer font-medium"
                  value="Zapisz się"
                />
              </form>
            </div>
          </div>
        </div>
        {/* Main links section with grid layout: 1 col mobile, 2 md, 3 lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-(--background) pt-8">
          {/* Logo column */}
          <div className="flex items-center">
            <Link href="/" className="inline-block">
              <Image
                src="https://cdn.prod.website-files.com/67c6c3a4d27cc65012ee864b/67ce14fc47d6a369c999d675_logo-compact.svg"
                loading="lazy"
                alt=""
                width={150}
                height={50}
              />
            </Link>
          </div>
          {/* Quick links and buttons section spanning 1 col */}
          <div className="col-span-1">
            <div className="grid grid-rows-2">
            {/* Inner grid for link columns: 1 col mobile, 2 sm, 4 lg */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* First link column */}
              <div>
                <div className="flex flex-col">
                  <Link href="/kontakt" className="text-sm mb-2 hover:underline">Kontakt</Link>
                  <Link href="/zasoby/czeste-pytania" className="text-sm mb-2 hover:underline">Częste pytania</Link>
                  <Link href="/o-nas/nasz-zespol" className="text-sm mb-2 hover:underline">Nasz zespół</Link>
                  <Link href="/sfc" className="text-sm mb-2 hover:underline">Strona SFC (UK)</Link>
                </div>
              </div>
              {/* Second link column */}
              <div>
                <div className="flex flex-col">
                  <Link href="/zasoby-dla-rodzicow" className="text-sm mb-2 hover:underline">Dla rodziców</Link>
                  <Link href="/zasoby-dla-nauczycieli" className="text-sm mb-2 hover:underline">Dla nauczycieli</Link>
                  <Link href="/spolecznosci-whatsapp" className="text-sm mb-2 hover:underline">WhatsApp</Link>
                  <Link href="/zostan-organizatorem-w-szkole" className="text-sm mb-2 hover:underline">Organizatorzy w szkołach</Link>
                </div>
              </div>
              {/* Third link column */}
              <div>
                <div className="flex flex-col">
                  <Link href="/siec-szkol" className="text-sm mb-2 hover:underline">Sieć szkół</Link>
                  <Link href="/alternatywy" className="text-sm mb-2 hover:underline">Alternatywy</Link>
                  <Link href="/rozmowy" className="text-sm mb-2 hover:underline">Rozmowy</Link>
                  <Link href="/sklep" className="text-sm mb-2 hover:underline">Sklep</Link>
                </div>
              </div>
            </div>
              {/* Action buttons row, stacked on sm*/}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href="/zaangazuj-sie"
                  className="border border-(--backgound) text-(--background) px-6 py-3 rounded-full hover:bg-(--background) hover:text-(--foreground) w-1/2"
                >
                  Zaangażuj się
                </Link>
                <Link
                  href="/wesprzyj-finansowo"
                  className="bg-(--main-accent) text-(--foreground) px-6 py-3 rounded-full hover:bg-(--background) w-1/2"
                >
                  Wesprzyj finansowo
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom section with social links and legal info, stacks on mobile, row on md */}
        <div className="border-t border-(--background) mt-8 pt-8 flex flex-col md:flex-row justify-between items-start text-sm">
          {/* Social follow section */}
          <div className="mb-4 md:mb-0 w-1/2">
            {/* Social icons row */}
            <div className="flex space-x-4">
              <a href="/instagram" target="_blank" className="inline-block">
                <div className="bg-(--main-accent) rounded-full p-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-(--foreground)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16 3H8C5.23858 3 3 5.23858 3 8V16C3 18.7614 5.23858 21 8 21H16C18.7614 21 21 18.7614 21 16V8C21 5.23858 18.7614 3 16 3ZM19.25 16C19.2445 17.7926 17.7926 19.2445 16 19.25H8C6.20735 19.2445 4.75549 17.7926 4.75 16V8C4.75549 6.20735 6.20735 4.75549 8 4.75H16C17.7926 4.75549 19.2445 6.20735 19.25 8V16ZM16.75 8.25C17.3023 8.25 17.75 7.80228 17.75 7.25C17.75 6.69772 17.3023 6.25 16.75 6.25C16.1977 6.25 15.75 6.69772 15.75 7.25C15.75 7.80228 16.1977 8.25 16.75 8.25ZM12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5027 10.8057 16.0294 9.65957 15.1849 8.81508C14.3404 7.97059 13.1943 7.49734 12 7.5ZM9.25 12C9.25 13.5188 10.4812 14.75 12 14.75C13.5188 14.75 14.75 13.5188 14.75 12C14.75 10.4812 13.5188 9.25 12 9.25C10.4812 9.25 9.25 10.4812 9.25 12Z" fill="currentColor" />
                  </svg>
                </div>
              </a>
              <a href="/whatsapp" className="inline-block">
                <div className="bg-(--main-accent) rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" role="img" className="text-(--foreground)">
                    <path d="M0.246094 19.7931C0.300414 19.6045 0.347492 19.4522 0.390948 19.2962C0.734977 18.0415 1.08263 16.7867 1.42666 15.5356C1.44476 15.4703 1.4339 15.3941 1.46649 15.3361C1.67291 14.9553 1.58238 14.6217 1.39044 14.2554C0.753084 13.0369 0.445268 11.735 0.390948 10.3569C0.34387 9.16019 0.474239 7.99609 0.861725 6.87187C1.10073 6.17921 1.3325 5.47567 1.79966 4.88093C2.22698 4.33333 2.57825 3.71682 3.05627 3.21637C3.62844 2.61799 4.2658 2.08853 5.00094 1.66423C5.3848 1.44301 5.76504 1.19641 6.16702 1.0042C6.43862 0.873649 6.74281 0.804746 7.03252 0.71771C7.31136 0.634301 7.59021 0.550891 7.86905 0.481988C9.2669 0.126591 10.6792 0.130218 12.0843 0.409458C12.7688 0.547265 13.4134 0.80112 14.0543 1.08761C15.1045 1.55906 16.0425 2.19007 16.8355 3.01328C17.3787 3.57539 17.9835 4.0976 18.2913 4.85917C18.3891 5.10577 18.5991 5.30523 18.7186 5.54095C19.3053 6.69417 19.5878 7.93081 19.7218 9.21459C19.8195 10.1647 19.6711 11.0895 19.5153 12.0179C19.3958 12.7395 19.1496 13.425 18.8345 14.0741C18.4579 14.8502 18.0125 15.5972 17.4077 16.2282C17.0383 16.6126 16.669 17.0007 16.2742 17.3597C15.8541 17.7405 15.4087 18.0959 14.8909 18.3425C14.5396 18.5093 14.1992 18.7051 13.8443 18.8647C12.7362 19.3615 11.5701 19.59 10.3605 19.6408C8.70197 19.7097 7.15565 19.2781 5.66727 18.5963C5.44637 18.4948 5.2653 18.4767 5.03353 18.5456C4.43238 18.7269 3.81675 18.8683 3.20837 19.0315C2.30303 19.2709 1.40131 19.5138 0.495968 19.7568C0.427162 19.7749 0.354735 19.7786 0.249715 19.7931H0.246094ZM9.77027 18.0016C10.9689 17.9871 11.8344 17.8384 12.7869 17.4794C13.1273 17.3524 13.4496 17.1784 13.7646 17.0007C14.1956 16.7541 14.641 16.5111 15.0321 16.2065C16.2453 15.2636 17.042 14.0088 17.5815 12.5836C17.6793 12.3261 17.7662 12.0541 17.8061 11.7821C17.9038 11.1149 18.0451 10.4403 18.0233 9.77307C18.0016 9.09129 17.9364 8.40588 17.73 7.73135C17.415 6.69055 16.9478 5.74041 16.2706 4.91357C15.5789 4.06497 14.7352 3.3723 13.7538 2.8646C12.9498 2.45117 12.106 2.16831 11.2079 2.05951C10.8748 2.01962 10.538 1.98698 10.2012 1.9761C9.94771 1.96885 9.6906 2.00874 9.4371 2.01237C8.70921 2.0305 7.99942 2.19732 7.33309 2.44755C6.85507 2.62525 6.3336 2.77393 5.94249 3.15109C5.92801 3.16559 5.89903 3.16559 5.88093 3.17647C5.76867 3.24538 5.66003 3.31065 5.55138 3.38318C5.4862 3.43033 5.43188 3.49198 5.36307 3.53912C5.20736 3.64792 5.03353 3.73858 4.88868 3.86551C4.6895 4.03595 4.5193 4.24266 4.32012 4.40948C3.76243 4.87005 3.44013 5.50831 3.0273 6.07767C2.98746 6.13207 2.95849 6.19734 2.94401 6.26262C2.81726 6.7667 2.53841 7.20551 2.38632 7.70597C2.1292 8.54731 2.01694 9.38866 2.04229 10.2554C2.07488 11.4304 2.3501 12.5473 2.90055 13.5881C2.99471 13.7695 3.08524 13.9508 3.16853 14.1357C3.27717 14.3678 3.38581 14.5709 3.27355 14.8719C3.0961 15.347 3.01643 15.8547 2.88969 16.3479C2.81002 16.667 2.71948 16.9862 2.63981 17.3053C2.6036 17.4431 2.66516 17.512 2.81002 17.4757C3.078 17.4105 3.34598 17.3416 3.61396 17.2727C4.17165 17.124 4.72934 16.9717 5.28703 16.8302C5.59484 16.7504 5.87369 16.7867 6.17064 16.939C6.7573 17.2364 7.3512 17.5483 7.97769 17.726C8.62954 17.9109 9.32122 17.9399 9.76665 18.0052L9.77027 18.0016Z" fill="currentColor" />
                    <path d="M12.7446 14.581C12.0131 14.5665 11.4083 14.425 10.8325 14.1494C10.5682 14.0225 10.2785 13.9536 10.0214 13.823C8.68869 13.1485 7.56607 12.2238 6.64987 11.027C6.27687 10.5411 5.98716 10.0116 5.66486 9.50026C5.34256 8.9853 5.25927 8.42319 5.14338 7.87559C5.03837 7.3969 5.18684 6.88919 5.44758 6.45038C5.68659 6.04421 5.9256 5.62717 6.42535 5.48211C6.80559 5.37331 7.17859 5.3443 7.50089 5.6453C7.54435 5.68519 7.59142 5.73233 7.61315 5.78311C7.8594 6.3851 8.09117 6.99073 8.34467 7.58547C8.48228 7.9046 8.47141 8.17659 8.22516 8.43407C8.06582 8.60089 7.92459 8.78947 7.76887 8.96354C7.58056 9.1775 7.59142 9.32256 7.76887 9.5329C8.0115 9.81939 8.23603 10.1168 8.46055 10.4178C8.82269 10.9001 9.24638 11.3316 9.74613 11.6544C10.1662 11.9228 10.637 12.1186 11.1005 12.3072C11.2019 12.3471 11.4083 12.2745 11.4952 12.1875C11.7451 11.93 11.9588 11.6399 12.1869 11.357C12.4078 11.085 12.5527 11.0343 12.8714 11.183C13.5087 11.4876 14.1388 11.8067 14.769 12.1258C14.9464 12.2165 14.9826 12.4377 14.9681 12.7025C14.9355 13.3589 14.5517 13.7868 14.0664 14.1349C13.65 14.4323 13.1828 14.6136 12.7446 14.5774V14.581Z" fill="currentColor" />
                  </svg>
                </div>
              </a>
              <a href="/linkedin" target="_blank" className="inline-block">
                <div className="bg-(--main-accent) rounded-full p-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-(--foreground)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.5 3C3.67157 3 3 3.67157 3 4.5V19.5C3 20.3284 3.67157 21 4.5 21H19.5C20.3284 21 21 20.3284 21 19.5V4.5C21 3.67157 20.3284 3 19.5 3H4.5ZM8.52076 7.00272C8.52639 7.95897 7.81061 8.54819 6.96123 8.54397C6.16107 8.53975 5.46357 7.90272 5.46779 7.00413C5.47201 6.15897 6.13998 5.47975 7.00764 5.49944C7.88795 5.51913 8.52639 6.1646 8.52076 7.00272ZM12.2797 9.76176H9.75971H9.7583V18.3216H12.4217V18.1219C12.4217 17.742 12.4214 17.362 12.4211 16.9819V16.9818V16.9816V16.9815V16.9812C12.4203 15.9674 12.4194 14.9532 12.4246 13.9397C12.426 13.6936 12.4372 13.4377 12.5005 13.2028C12.7381 12.3253 13.5271 11.7586 14.4074 11.8979C14.9727 11.9864 15.3467 12.3141 15.5042 12.8471C15.6013 13.1803 15.6449 13.5389 15.6491 13.8863C15.6605 14.9339 15.6589 15.9815 15.6573 17.0292V17.0294C15.6567 17.3992 15.6561 17.769 15.6561 18.1388V18.3202H18.328V18.1149C18.328 17.6629 18.3278 17.211 18.3275 16.7591V16.759V16.7588C18.327 15.6293 18.3264 14.5001 18.3294 13.3702C18.3308 12.8597 18.276 12.3563 18.1508 11.8627C17.9638 11.1286 17.5771 10.5211 16.9485 10.0824C16.5027 9.77019 16.0133 9.5691 15.4663 9.5466C15.404 9.54401 15.3412 9.54062 15.2781 9.53721L15.2781 9.53721L15.2781 9.53721C14.9984 9.52209 14.7141 9.50673 14.4467 9.56066C13.6817 9.71394 13.0096 10.0641 12.5019 10.6814C12.4429 10.7522 12.3852 10.8241 12.2991 10.9314L12.2991 10.9315L12.2797 10.9557V9.76176ZM5.68164 18.3244H8.33242V9.76733H5.68164V18.3244Z" fill="currentColor" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
          {/* Legal links and info section */}
          <div className="md:text-right w-1/2">
            {/* Policy links row */}
            <div className="flex space-x-4 mb-2">
              <Link href="/polityka-prywatnosci" className="text-sm hover:underline">Polityka prywatności</Link>
              <Link href="/kodeks-postepowania" className="text-sm hover:underline">Kodeks postępowania</Link>
            </div>
            {/* Charitable status info */}
            <div className="text-left text-xs opacity-70">[zastrzeżenia prawne]</div>
          </div>
        </div>
      </div>
      {/* Hidden cookie preferences modal, fixed at bottom */}
      <div style={{ display: 'none' }} className="fixed bottom-0 left-0 right-0 bg-white text-black p-4 shadow-lg">
        {/* Inner container for modal content */}
        <div className="max-w-md mx-auto">
          <a href="#" className="absolute top-2 right-2 text-xl">&times;</a>
          <div className="text-lg font-bold mb-2">Ustawienia "ciasteczek"</div>
          <div className="text-sm mb-4">Klikając w “Zgadzam się”, wyrażasz zogdę na przechowywanie naszych "ciasteczek" na Twoim urządzeniu w celach poprawnego funkcjonowania tej strony zgodnie z jej przeznaczeniem, w sposób opisany w naszej <Link href="/polityka-prywatnosci" className="underline">"Polityce prywatności"</Link>.</div>
          {/* Hidden form container for cookie options */}
          <div style={{ width: '100%', height: 0, display: 'none' }}>
            <form id="ck-form" name="wf-form-ck-form" data-name="ck-form" method="get" className="flex flex-col" aria-label="ck-form">
              {/* Strictly Necessary option */}
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <div className="bg-gray-300 p-1 rounded mr-2"></div>
                  <div className="text-sm">Niezbędne (zawsze aktywne)</div>
                </div>
                <div className="text-xs">Ciasteczka wymagane to poprawnego funkcjonowania strony.</div>
              </div>
              {/* Analytics option */}
              <div className="mb-4">
                <label className="flex items-center mb-1">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Analityka</span>
                </label>
                <div className="text-xs">Ciasteczka pomagające nam rozumieć w jaki sposób użytkownicy korzystają ze strony i optymalizować jej użyteczność i wydajność.</div>
              </div>
              {/* Marketing option */}
              <div className="mb-4">
                <label className="flex items-center mb-1">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Marketing</span>
                </label>
                <div className="text-xs">Ciasteczka używane do prowadzenia działalności promocyjnej związanej z ruchem Dzieciństwo Bez Smartfona.</div>
              </div>
              {/* Personalisation option */}
              <div className="mb-4">
                <label className="flex items-center mb-1">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Personalizacja</span>
                </label>
                <div className="text-xs">Ciasteczka umożliwiające pamiętanie Twoich osobistych ustawień funkcjonalności strony.</div>
              </div>
            </form>
          </div>
          {/* Divider */}
          <div className="border-t border-gray-300 my-4"></div>
          {/* Action buttons row */}
          <div className="flex justify-between">
            <a href="#" className="text-sm underline mr-4">Dostosuj</a>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-200 px-4 py-2 text-sm">Odrzuć wszystkie</a>
              <a href="#" className="bg-green-700 text-white px-4 py-2 text-sm">Zaakceptuj wszystkie</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
