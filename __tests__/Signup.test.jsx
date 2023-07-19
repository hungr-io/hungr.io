import renderer from 'react-test-renderer';
import Signup from '../src/components/Signup.jsx';


/* EX:
it ('changes the class when hovered', () => {
  const component = renderer.create(
    <Link page="URL">Facebook</Link>,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger callback 
  renderer.act(() => {
    tree.props.onMouseEnter();
  });

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger callback
  renderer.act(() => {
    tree.props.onMouseLeave();
  });

  // re-rendering 
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
*/