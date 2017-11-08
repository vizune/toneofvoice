(function() {
    
    // Card 6 animation timeline
    const card6 = document.querySelector('#card6')
    const tlCard6 = new TimelineMax({paused: true})
    const shapeSix = document.querySelectorAll('.svg-path--animate-six')
    const shapeSixPolygon = document.querySelector('.svg-path--animate-polygon')
    const shapeSixMorph = document.querySelector('.svg-path--animate-morph')

    tlCard6
        .add("morph", 0)
        .to(shapeSixPolygon, 0, { opacity: 0, scale: 0 })
        .to(shapeSix, 0, {scaleX: 0, transformOrigin: 'bottom left'})
        .to(shapeSixMorph, 0, {scaleX: 0, transformOrigin: 'bottom left'})
        .staggerTo(shapeSix, .8, {scaleX: 1, ease: Elastic.easeOut.config(0.9, 0.8)}, .15, "morph")
        .to(shapeSixMorph, .2, {scaleX: 1, ease: Elastic.easeOut.config(0.9, 0.8), delay: .3}, "morph")
        .to(shapeSixMorph, 0.4, {morphSVG: {shape: shapeSixPolygon}, fill:'#383288', scale: 1, delay: .4, ease: Elastic.easeOut.config(0.5, 0.5)}, "morph")
        .to(shapeSixPolygon, 0, { opacity: 1, scale: 1 })
        .to(shapeSixMorph, 0, {morphSVG: {shape: shapeSixMorph}, fill: '#E84267', scaleX: 0, delay: 0.1})
        .to(card6, 0, {className: "+=card--flipped"})

    
    // Card 7 animation timeline
    const card7 = document.querySelector('#card7')
    const tlCard7 = new TimelineMax({paused: true})
    const shapeSeven = document.querySelector('.svg-path--animate-seven')

    tlCard7
        .to(shapeSeven, 0.4, { ease: Elastic.easeOut.config(1, 0.5), x: '-30%', y: 0, scale: 1.2 })
        .to(shapeSeven, 0.4, { ease: Elastic.easeOut.config(1, 0.5), x: '0%', y: 0, scale: 1 })
        .to(card7, 0, {className: "+=card--flipped"})


    // Card 8 animation timeline
    const card8 = document.querySelector('#card8')
    const tlCard8 = new TimelineMax({paused: true})
    const shapeEight = document.querySelectorAll('.svg-path--animate-eight')

    tlCard8
        .to(shapeEight, 0, {scaleX: 0, transformOrigin: '100%, 100%'})
        .staggerTo(shapeEight, .4, {scaleX: 1, ease: Elastic.easeOut.config(.6, .4)}, 0.1)
        .to(card8, 0, {className: "+=card--flipped"})


    // Card 9 animation timeline
    const card9 = document.querySelector('#card9')
    const tlCard9 = new TimelineMax({paused: true})
    const shapeNineMouth = document.querySelector('.svg-path--animate-nine-mouth')
    const shapeNineEyeLeft = document.querySelector('.svg-path--animate-nine-eye-left')
    const shapeNineEyeRight = document.querySelector('.svg-path--animate-nine-eye-right')

    tlCard9
        .add("shout", 0)
        .add("rest", 0.4)
        .to(shapeNineMouth, 0.25, { ease: Power2.easeOut, x:0, y: 0, scale: 1.2, transformOrigin:'center' }, "shout")
        .to(shapeNineEyeLeft, 0.25, { ease: Power2.easeOut, x:-10, y: -10, scale: 1.5, transformOrigin:'center' }, "shout")
        .to(shapeNineEyeRight, 0.25, { ease: Power2.easeOut, x:10, y: -10, scale: 1.5, transformOrigin:'center' }, "shout")
        .to(shapeNineMouth, 0.35, { ease: Power2.easeOut, x:0, y: 0, scale: 1, transformOrigin:'center' }, "rest")
        .to(shapeNineEyeLeft, 0.35, { ease: Power2.easeOut, x:0, y: 0, scale: 1, transformOrigin:'center' }, "rest")
        .to(shapeNineEyeRight, 0.35, { ease: Power2.easeOut, x:0, y: 0, scale: 1, transformOrigin:'center' }, "rest")
        .to(card9, 0, {className: "+=card--flipped"})


    // Card 10 animation timeline
    const card10 = document.querySelector('#card10')
    const tlCard10 = new TimelineMax({paused: true})
    const shapeTen = document.querySelector('.svg-path--animate-ten')

    tlCard10 
        .to(shapeTen, 0, { ease: Elastic.easeOut.config(.35, 1), x:0, y: -200 })
        .to(shapeTen, .7, { ease: Elastic.easeOut.config(.35, 1), x:0, y: 0 })
        .to(card10, 0, {className: "+=card--flipped"})
    
    // Event listeners
    const cardArray = [
        {id: card6, timeline: tlCard6},
        {id: card7, timeline: tlCard7},
        {id: card8, timeline: tlCard8},
        {id: card9, timeline: tlCard9},
        {id: card10, timeline: tlCard10}
    ]

    cardArray.forEach(card =>  {
        card.id.addEventListener('click', () => {
            cardFlipped(card.id, card.timeline)
        })

        card.id.addEventListener('keyup', (e) => {
            if (e.keyCode === 13 || e.keyCode === 32) {
                cardFlipped(card.id, card.timeline)
            }
        })
    })

    // Card flip
    function cardFlipped(cardId, cardTimeline) {
        if (cardId.classList.contains('card--flipped')) {
            cardId.classList.remove('card--flipped') 
        } else {
            cardTimeline.restart(0)
        }
    }

})();