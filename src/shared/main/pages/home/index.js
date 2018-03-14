import React, { Component } from 'react';
import Tablet from "components/tablet";

import styles from "./index.scss"
import cn from "classnames";
import { Parallax, Background } from 'react-parallax';

const ScreenSection = ({ children, ...attr }) => (
    <section id={styles.topArticle} {...attr} >
        { children }
    </section>
)

const ImageSection = ({ title, children, image}) => (
    <Parallax strength={500} bgImage={ image }>
        <div className={cn(styles.wrapper,styles.left)}>
            <div className={styles.background} />
            <div className={styles.container} >
                <h2>{ title }</h2>
                <div className={styles.article}>
                    { children }
                </div>
            </div>
        </div>
        <div style={{ height: '100vh' }} />
    </Parallax>
)

class Home extends Component {
    state = {  };
    initScrollEvent = () => {
        const threshold = 1000;

        let p = 0;
        const nodes = this.refs.wrap.childNodes;
        let lastEventTime = Date.now();
        document.addEventListener("123",(ev) =>{
            if( Date.now() - lastEventTime > threshold){
                p++
                console.log(nodes[p].offsetTop)
                window.scrollTo(0,nodes[p].offsetTop);
                lastEventTime = Date.now();
            }
        })
    }

    componentDidMount(){
        this.initScrollEvent();
        
    }
    render() {
        const src = [
            "https://cdn.pixabay.com/photo/2018/02/08/10/22/paper-3139127_1280.jpg",
            "https://cdn.pixabay.com/photo/2018/02/16/10/52/adorable-3157394_1280.jpg"
        ];
        return (
            <div ref="wrap">
                <ScreenSection className={styles.top} >
                    <div className={styles.heading}>
                        <h1> OpenDrawing </h1>
                        <h2> 온라인 드로잉 툴의 혁명</h2>
                    </div>
                    <div className={styles.body}>
                        <Tablet />
                    </div>
                </ScreenSection>
                <ImageSection title="오픈 드로잉은..." image={src[0]}>
                    <article>
                        오픈드로잉은 socket io, html5기반의 웹 그래픽 편집 도구입니다. 편집 도구와 비교했을때 뛰어난 사용극한의 가벼움을 자랑하며, 편집 과정을 다른 사용자들과 공유할 수 있습니다. 내가 그리고 있는 그림을 단말기를 쓰고있는 친구가 실시간으로 볼 수 있으며, 자유로이 편집할 수 있습니다.
                    </article>
                    <article>
                        html5 기반이기때문에 웹 브라우저를 실행할 수 있는 환경이라면 어디든지 사용 가능합니다. 특히 모지향적으로 개발되었기 때문에 스마트폰이나 태블릿 유저에게 뛰어난 사용자 경험을 제공할 수 있다고 자신 할있습니다. 
                    </article>  
                </ImageSection>
                <ImageSection title="공짜!!" image={src[0]}>
                    <article>
                        
                        
                    </article>
                    <article>
                        html5 기반이기때문에 웹 브라우저를 실행할 수 있는 환경이라면 어디든지 사용 가능합니다. 특히 모지향적으로 개발되었기 때문에 스마트폰이나 태블릿 유저에게 뛰어난 사용자 경험을 제공할 수 있다고 자신 할있습니다. 
                    </article>  
                </ImageSection>
            </div>
        );
    }
}

export default Home;