import React, { ChangeEvent, MouseEvent} from "react";
import { Props } from "../types/types";

interface State {
    name: string
}

export class Input extends React.Component<Props, State> {
    constructor(props: Props){
        super(props)
        this.state = {
            name : ''
        }
    }

    onChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({name: event.currentTarget.value})
    }

    onClick = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault()
        console.log(this.state.name);
    }

    render(){
        return(
            <form>
                <input placeholder="enter a name" onChange={this.onChange}></input>
                <button type="submit" onClick={this.onClick}>search</button>
            </form>
        )
    }
}