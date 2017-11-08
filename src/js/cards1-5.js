// Polyfill to add .children to SVG elements (IE11)
;(function (constructor) {
    if (constructor &&
        constructor.prototype &&
        constructor.prototype.children == null) {
        Object.defineProperty(constructor.prototype, 'children', {
            get: function () {
                var i = 0, node, nodes = this.childNodes, children = []
                while (node = nodes[i++]) {
                    if (node.nodeType === 1) { children.push(node) }
                }
                return children
            }
        })
    }
})(window.Node || window.Element);

(function() {
    const card1group = document.querySelector('#card1-group')
    const card1path = document.querySelector('#card1-path')
    const card1TL = new TimelineMax({ paused: true })
    card1TL
        .to(card1path, .4, { morphSVG: { shape: '#card1-circle'}, ease: Power3.easeOut })
        .to(card1path, .5, { morphSVG: { shape: '#card1-triangle'}, delay: 0.2, ease: Power3.easeOut })
        .to('#card1', 0, { className: '+=card--flipped', delay: 0.2 })
        .to(card1path, 0, { morphSVG: { shape: card1path}, delay: 0.3, ease: Power3.easeOut })
    
    const card2group = document.querySelector('#card2-group')
    const card2TL = new TimelineMax({ paused: true })
    card2TL.set(card2group.children, { opacity: 0 })
    Array.from(card2group.children).forEach((el, index) => {
        card2TL.to(el, 0.15, {opacity: 1, ease: Power3.easeOut})
    })
    const card2overallTL = card2TL.tweenFromTo(0, card2TL.duration(), { ease: Power1.easeOut, paused: true, onComplete: function() {
        document.querySelector('#card2').classList.add('card--flipped')
    } })
    
    const card3group = document.querySelector('#card3-group')
    const card3TL = new TimelineMax({ paused: true })
    card3TL.set(card3group, { transformOrigin: '50% 50%'});
    card3TL
        .to(card3group, .2, { scale: 0.65, ease: Power2.easeOut })
        .to(card3group, .15, { scale: 1.1, ease: Power2.easeOut })
        .to(card3group, .5, { scale: 1, ease: Elastic.easeOut })
        .to('#card3', 0, { className: '+=card--flipped' })
    
    const card4group = document.querySelector('#card4-group')
    const card4TL = new TimelineMax({ paused: true })
    card4TL.set(card4group, { transformOrigin:'top center'});
    card4TL
        .to(card4group, .2, { rotation: 20 })
        .to(card4group, .2, { rotation: -20 })
        .to(card4group, .2, { rotation: 15 })
        .to(card4group, .8, { rotation: 0, ease: Elastic.easeOut })
        .to('#card4', 0, { className: '+=card--flipped' })
    
    const card5eyelid = document.querySelector('#card5eye')
    const card5iris = document.querySelector('#card5-iris')
    const card5TL = new TimelineMax({ paused: true })
    card5TL
        .to(card5eyelid, .3, { morphSVG: { shape: '#card5eyeclosed'}, ease: Power3.easeIn })
        .to(card5eyelid, .2, { morphSVG: { shape: '#card5eyeopen'}, ease: Power3.easeOut }, 'time1')
        .to(card5iris, .3, { x: -30, y: -2, ease: Power1.easeOut }, 'time1')
        .to(card5iris, .3, { x: 30, delay: 0.2, ease: Power1.easeOut })
        .to(card5eyelid, .3, { morphSVG: { shape: '#card5eyeclosed'}, ease: Power3.easeIn }, 'time2')
        .to(card5eyelid, .2, { morphSVG: { shape: '#card5eyeopen'}, ease: Power3.easeOut })
        .to(card5iris, .2, { x: 0, y: 0, delay: 0.1, ease: Power1.easeOut }, 'time2')
        .to('#card5', 0, { className: '+=card--flipped' })
    
    function cardFlip(cardId, cardTimeline) {
        if (cardId.classList.contains('card--flipped')) {
            cardId.classList.remove('card--flipped')
        } else {
            cardTimeline.restart(0)
        }
    }
    
    const cardsArray = [
        {id: card1, timeline: card1TL},
        {id: card2, timeline: card2overallTL},
        {id: card3, timeline: card3TL},
        {id: card4, timeline: card4TL},
        {id: card5, timeline: card5TL}
    ]

    cardsArray.forEach(card => {
        card.id.addEventListener('click', () => {
            cardFlip(card.id, card.timeline)
        })

        card.id.addEventListener('keyup', (e) => {
            if (e.keyCode === 13 || e.keyCode === 32) {
                cardFlip(card.id, card.timeline)
            }
        })
    })

    const mediaQuery = window.matchMedia('(max-width: 768px)')
    let mySwipe

    
    
    if(matchMedia) {
        mediaQuery.addListener(widthChange)
        widthChange(mediaQuery)
    }

    function widthChange(mediaQuery) {
        if (mediaQuery.matches) {
            mySwipe = new Swipe(document.querySelector('.swipe-container'))

            const btnPrev = document.querySelector('.btn-prev')
            const btnNext = document.querySelector('.btn-next')

            btnPrev.addEventListener('click', () => {
                mySwipe.prev()
            })

            btnNext.addEventListener('click', () => {
                console.log('Next')
                mySwipe.next()
            })

        } else {
            if (mySwipe !== undefined) {
                mySwipe.kill()
            }
        }
    }
})();
