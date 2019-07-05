import React from 'react';

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render(): any {
    const { classes, theme }: any = this.props;

    return (
      <div>
        <p>HYU-OMS Version 4</p>
      </div>
    );
  }
}

export default App;