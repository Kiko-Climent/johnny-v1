const Slider1 = () => {
  return(
    <div className="w-screen h-screen">
      <div className="slider-content">
        <div className="slide-number">
          <div className="prefix">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
          </div>
          <div className="postfix"><span>/</span> 5</div>
        </div>

        <div className="slide-name">
          <div className="names">
            <div>35°18′67″N 11°73′89″E</div>
            <div>19°28′23″N 24°33′75″W</div>
            <div>75°78′33″N 57°50′37″E</div>
            <div>55°88′75″N 14°58′53″W</div>
            <div>22°10′45″N 88°23′36″E</div>
          </div>
        </div>

        <div className="slide-year">
          <div className="years">
            <div>2024</div>
            <div>2022</div>
            <div>2023</div>
            <div>2024</div>
            <div>2025</div>
          </div>
        </div>
      </div>
      <div className="slider">
        <div className="slide" id="slide-1">
          <img src="/images/image00032.webp" alt=""/>
        </div>
        <div className="slide" id="slide-2">
          <img src="/images/image00021.jpeg" alt=""/>
        </div>
        <div className="slide" id="slide-3">
          <img src="/images/image00030.jpeg" alt=""/>
        </div>
        <div className="slide" id="slide-4">
          <img src="/images/image00030.jpeg" alt=""/>
        </div>
        <div className="slide" id="slide-5">
          <img src="/images/image00039.jpeg" alt=""/>
        </div>
        <div className="h-[400vh]"></div>
      </div>
      <script>
        document.addEventlistener("DOMContentLoaded, function(){
          const slides = document.querySelectorAll(".slide");
          let currentSlideIndex = 0;
          let isAnimating = false;
          let currentTopValue = 0;

          const elements = [
            {selector: ".prefix", delay: 0}
            {selector: ".names", delay: 0.15}
            {selector: ".years", delay: 0.3}
          ];
          slides.forEach((slide, idx) => {
            if (idx !== 0) {
              const img = slide.querySelector("img")
              gsap.set(img, {scale: 2, top: "4em"})
            }
          })
          function showSlide(index) {
            if(isAnimating) return;
            isAnimating = true;
            const slide = slides[index]
            const img = slide.querySelector("img");

            currentTopValue -= 30

            elements.forEach((elem) => {
              gsap.to(document.querySelector(elem.selector), {
                y: `${currentTopValue}px`,
                duration: 2,
                ease: "power4.inOut",
                delay: elem.delay
              })
            })
            gsap.to(img, {
              scale: 1,
              top: "0%",
              duration: 2,
              ease: "power3.inOut"
            })
            gsap.to(slide, {
              clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
              duration: 2,
              ease: "power4.inOut",
              onComplete: () => {
                isAnimating = false
              },
            },
            "<"
          );
          }
          function hideSlide(index) {
            if(isAnimating) return;
            isAnimating = true;
            const slide = slides[index];
            const img = slide.querySelector("img");

            currentTopValue -= 30;
            elements.forEach((elem) => {
              gsap.to(document.querySelector(elem.selector), {
                y: `${currentTopValue}px`,
                duration: 2,
                ease: "power4.inOut",
                delay: elem.delay,
              })
            })
            gsap.to(slide, {
              clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
              duration: 2,
              ease: "power4.inOut",
            }),
            gsap.to(img, {
              scale: 2,
              top: "4em",
              duration: 2,
              ease: "power3.inOut"
            })
            gsap.to(slide, {
              clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
              duration: 2,
              ease: "power4.inOut",
              onComplete: () => {
                isAnimating = false
              },
            },
            "<"
            );
          }
          window.addEventlistener("wheel", (e) => {
            if (isAnimating) return;
            if (e.deltaY > 0 && currentSlideIndex < slides.length -1)
            {
              showSlide(currentSlideIndex + 1),
              currentSlideIndex++;

            } else if (e.deltaY < 0 && currentSlideIndex > 0) {
              hideSlide(currentSlideIndex);
              currentSlideIndex--;
            }
          })
        }
      </script>
    </div>
  )
}

export default Slider1;