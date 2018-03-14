import React, { Component } from 'react';
import TitleHeading from "components/title-heading";
import Logo from "logo.png"
import ParallelGreed from 'components/parallel-greed';
import { Parallax, Background } from 'react-parallax';

import { Link, DirectLink, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const durationFn = function(deltaTop) {
    return deltaTop;
};

class Section extends React.Component{

  constructor (props){
      super(props);
      this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount() {

    Events.scrollEvent.register('begin', function() {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function() {
      console.log("end", arguments);
    });

  }
  scrollToTop() {
    scroll.scrollToTop();
  }
  scrollTo() {
    scroller.scrollTo('scroll-to-element', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  }
  scrollToWithContainer() {

    let goToContainer = new Promise((resolve, reject) => {

      Events.scrollEvent.register('end', () => {
        resolve();
        Events.scrollEvent.remove('end');
      });

      scroller.scrollTo('scroll-container', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });

    });

    goToContainer.then(() =>  
        scroller.scrollTo('scroll-container-second-element', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart',
            containerId: 'scroll-container'
        }));
  }
  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }
  render () {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} >Test 1</Link></li>
                <li><Link activeClass="active" className="test2" to="test2" spy={true} smooth={true} duration={500}>Test 2</Link></li>
                <li><Link activeClass="active" className="test3" to="test3" spy={true} smooth={true} duration={500} >Test 3</Link></li>
                <li><Link activeClass="active" className="test4" to="test4" spy={true} smooth={true} duration={500}>Test 4</Link></li>
                <li><Link activeClass="active" className="test5" to="test5" spy={true} smooth={true} duration={500} delay={1000}>Test 5 ( delay )</Link></li>
                <li><Link activeClass="active" className="test6" to="anchor" spy={true} smooth={true} duration={500}>Test 6 (anchor)</Link></li>
                <li><Link activeClass="active" className="test7" to="test7" spy={true} smooth={true} duration={durationFn}>Test 7 (duration and container)</Link></li>
                <li> <a onClick={() => scroll.scrollTo(100)}>Scroll To 100!</a></li>
                <li> <a onClick={() => scroll.scrollToBottom()}>Scroll To Bottom</a></li>
                <li> <a onClick={() => scroll.scrollMore(500)}>Scroll 500 More!</a></li>
                <li> <a onClick={() => scroll.scrollMore(1000, { delay : 1500 })}>Scroll 1000 More! ( delay ) </a></li>
                <li><Link activeClass="active" className="test8" to="same" spy={true} smooth={true} duration={500}>Same target</Link></li>
                <li><Link activeClass="active" className="test9" to="same" spy={true} smooth={true} duration={500}>Same target</Link></li>
                <li><a className="test1" to="test1" onClick={() => this.scrollTo()} >Scroll to element</a></li>
                <li><a className="test1" to="test1" onClick={() => this.scrollToWithContainer()} >Scroll to element within container</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <Element name="test1" className="element" >
          test 1
        </Element>

        <Element name="test2" className="element">
          test 2
        </Element>

        <Element name="test3" className="element">
          test 3
        </Element>

        <Element name="test4" className="element">
          test 4
        </Element>

        <Element name="test5" className="element">
          test 5
        </Element>

        <div id="anchor" className="element">
          test 6 (anchor)
        </div>

        <Link activeClass="active" to="firstInsideContainer" spy={true} smooth={true} duration={250} containerId="containerElement" style={{display:'inline-block', margin: '20px'}}>
          Go to first element inside container
        </Link>

        <Link activeClass="active" to="secondInsideContainer" spy={true} smooth={true} duration={250} containerId="containerElement" style={{display:'inline-block', margin: '20px'}}>
          Go to second element inside container
        </Link>
        
        <Element name="test7" className="element" id="containerElement" style={{
          position: 'relative',
          height:'200px',
          overflow:'scroll',
          marginBottom: '100px'
        }}>

          <Element name="firstInsideContainer" style={{
            marginBottom: '200px'
          }}>
            first element inside container
          </Element>

          <Element name="secondInsideContainer" style={{
            marginBottom: '200px'
          }}>
            second element inside container
          </Element>
        </Element>


        <Element id="same" className="element">
          Two links point to this
        </Element>


        <Element name="scroll-to-element" className="element">
          Scroll to element
        </Element>

        <Element className="element" id="scroll-container" style={{
          position: 'relative',
          height:'200px',
          overflow:'scroll',
          marginBottom: '100px'
        }}>

          <Element name="scroll-container-first-element" style={{
            marginBottom: '200px'
          }}>
            first element inside container
          </Element>

          <Element name="scroll-container-second-element" style={{
            marginBottom: '200px'
          }}>
            second element inside container
          </Element>
        </Element>

        <a onClick={this.scrollToTop}>To the top!</a>

      </div>
    );
  }
};


 

class About extends Component {
    
    render() {
        const introduceData = [
            {
                title: "공동 공유", 
                content: `떨어져 있는 친구들과 그림을 그리고 싶다고요? 당장 시작하세요!`
            },
            {
                title: "온라인 웹 드로잉", 
                content: `앱 설치의 시대는 지났습니다. 모든것은 웹으로 통합니다.`
            },
            {
                title: "공짜", 
                content: `no pay, no ad!
                모든 서비스는 무료입니다!`
            },
        ]

        return (
            <div id="wrap">
                <img src={Logo} alt="로고" />
                <TitleHeading main="About" sub="OpenDrawing에 대해" />
                <div>
                    소켓 기반의
                    온라인 그룹 그래픽 편집도구
                </div>
                <div>
                    <ParallelGreed items={introduceData} title="What is Open drawing?" />
                </div>
            </div>
        )
    }
}

export default () => (
    <Parallax
    bgImage={" https://manateecoin.org/images/pic02.jpg "}
    bgImageAlt="the cat"
    strength={200}
    >
    Put some text content here
    or even an empty div with fixed dimensions
    to have a height for the parallax.
    <div style={{ height: '1200px' }} />
    </Parallax>
);