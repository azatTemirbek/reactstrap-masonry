import React, { PureComponent } from 'react';
import './Masonry.css';

/**
 * Modified from codepen  'https://codepen.io/anon/pen/XPdEpM' 
 * A component to render Masonry layout
 * @example
 * <XMasonry brakePoints={[350, 500, 750]} >{ this.state.photos.map((image, id) =>( <img key={id}  src={image}/> ) )} </XMasonry>
 */
export class Masonry extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { columns: 1 };

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
    }
    componentDidMount() {
        this.onResize();
        window.addEventListener('resize', this.onResize)
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
        const columnStyle = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignContent: 'stretch',
            flexGrow: '1',
            ...this.props.columnStyle
        };
        return (
            <div style={masonryStyle} ref="Masonry">
                {this.mapChildren().map((col, ci) => {
                    return (
                        <div style={columnStyle} key={ci} >
                            {col.map((child, i) => {
                                return <React.Fragment key={i} >{child}</React.Fragment>
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}