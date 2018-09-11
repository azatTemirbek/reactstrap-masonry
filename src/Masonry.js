import React, { PureComponent } from 'react';
import './Masonry.css';
import { Col, Card, Row } from 'reactstrap';

/**
 * Modified from codepen  'https://codepen.io/anon/pen/XPdEpM' 
 * A component to render Masonry layout
 * @example
 * <XMasonry brakePoints={[350, 500, 750]} >{ this.state.photos.map((image, id) =>( <img key={id}  src={image}/> ) )} </XMasonry>
 */
export class Masonry extends PureComponent {
    
    state = { 
        columns: 1,
        prevY:0
    };

    constructor(props) {
        super(props);

        this.onResize = () => {
            const columns = this.getColumns(this.refs.Masonry.offsetWidth);
            if (columns !== this.state.columns) this.setState({ columns: columns });
        }

        this.getColumns = w => {
            return this.props.brakePoints.reduceRight((p, c, i) => {
                return c < w ? p : i;
            }, this.props.brakePoints.length) + 1;
        }

        this.mapChildren = () => {
            let col = [];
            const numC = this.state.columns;
            for (let i = 0; i < numC; i++) {
                col.push([]);
            }
            return this.props.children.reduce((p, c, i) => {
                p[i % numC].push(c);
                return p;
            }, col);
        }
        this.handleObserver = (entities, observer) => {
            const y = entities[0].boundingClientRect.y;
            if(this.state.prevY > y){
                this.props.loadNext && this.props.loadNext();
            }
            this.setState({prevY:y},()=>{
                console.log(entities[0].boundingClientRect.y);
                
            });


        }
    }
    componentDidMount() {
        this.onResize();
        // add listener for window object
        window.addEventListener('resize', this.onResize);
        // Create an observer
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this), //callback
            {
                root: null, // Page as root
                rootMargin: "0px",
                threshold: 0.01
            }
        );
        //Observ the `loadingRef`
        this.observer.observe(this.refs.loadingRef);
    }
    render() {
        const masonryStyle = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'stretch',
            width: '100%',
            margin: 'auto',
            ...this.props.masonryStyle
        };
        return (
            <Row style={{overflowY: 'auto',margin:'5px', height:this.props.height||'500px'}}>
                <div style={masonryStyle} ref="Masonry">
                    {this.mapChildren().map((col, ci) => {
                        return (
                            <Col className='pr-2 pl-2' style={this.props.columnStyle} key={ci} >
                                {col.map((child, i) => {
                                    return <Card key={i} className='mt-2 mb-2'>{child}</Card>
                                })}
                            </Col>
                        )
                    })}
                </div >
                <div ref="loadingRef" style={{ height: "10%", width:'100%', margin: "0px", background: 'red' }} >
                    <span style={{ display: this.state.loading ? "block" : "none" }}>Loading...</span>
                </div>
            </Row>
        )
    }
}