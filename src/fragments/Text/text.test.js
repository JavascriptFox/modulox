import 'jest-styled-components';

import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import ThemeProvider from '../../services/theme';
import defaultTheme from '../../../default.theme';
import Text from './';

describe('TextFragment', () => {
  it('fall backs to the default values even when values are missing in theme', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={{}}>
          <Text />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('font-family', 'inherit');
    expect(tree).toHaveStyleRule('font-size', '100%');
  });

  it('renders default font size and font family', () => {
    const tree = renderer
      .create(
        <ThemeProvider
          theme={{
            typography: {
              defaultFontFamily: 'Arial',
              defaultFontSize: 20,
            },
          }}
        >
          <Text />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('font-family', 'Arial');
    expect(tree).toHaveStyleRule('font-size', '20px');
  });

  it('renders with changed style rules', () => {
    const tree = renderer
      .create(
        <Text
          color="yellow"
          space="pre-line"
          lineHeight={1.75}
          letterSpacing="0.5px"
        />
      )
      .toJSON();
    expect(tree).toHaveStyleRule('color', 'yellow');
    expect(tree).toHaveStyleRule('white-space', 'pre-line');
    expect(tree).toHaveStyleRule('line-height', '1.75');
    expect(tree).toHaveStyleRule('letter-spacing', '0.5px');
  });

  it('renders with correct theme properties', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={{ colors: { red: '#d41111' } }}>
          <Text color="red" />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('color', '#d41111');
  });

  it('render and the children HTML elements', () => {
    const component = shallow(
      <Text>
        <div className="test">Test</div>
      </Text>
    );
    expect(component.contains(<div className="test">Test</div>)).toBe(true);
  });
});
