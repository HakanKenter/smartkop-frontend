import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Search from '../components/layout/Search';

// We "mock" the react-router-dom module by creating a simulated version of the object exported by the module.
jest.mock('react-router-dom', () => ({
  
  // simulated values for module properties, here useNavigate
  // which is initialized to a simulated function created with "jest.fn()"
  useNavigate: jest.fn()
  
}))

// test group
describe("Search component", () => {

  // To init useNavigate function before each test
  beforeEach(() => {
    useNavigate.mockClear();
  })

  test('should navigate to products-search page with search query', () => {
    // creates a new mock function that will be used to replace the real useNavigate() function of react-router-dom
    const navigateMocke = jest.fn();
    useNavigate.mockReturnValue(navigateMocke);

    // the render function provided by @testing-library/react to render the Search 
    // component in an isolated test environment. This function returns an object 
    // containing various functions to search and interact with the elements of the rendered component.
    // getByTestId is a function that retrieves an element from the DOM of the rendered component based on its data-testid attribute.
    const { getByTestId } = render(<Search />);

    const input = getByTestId('search-input');
    const searchButton = getByTestId('search-btn');
    

    // simulates a value change in a form element 'input'
    fireEvent.change(input, { target: { value: 'test'}});
    // simulates a click on 'searchButton' button
    fireEvent.click(searchButton);

    // This interaction should trigger the call of the navigateMock function with the argument '/products-search?search=test'.
    expect(navigateMocke).toHaveBeenCalledWith('/products-search?search=test');
  });

  test('should navigate to product page without search query', () => {

    const navigateMocke = jest.fn();
    useNavigate.mockReturnValue(navigateMocke);

    const { getByTestId } = render(<Search />);

    const input = getByTestId('search-input');
    const searchButton = getByTestId('search-btn');

    fireEvent.click(searchButton);

    expect(navigateMocke).toHaveBeenCalledWith('/products-search')

  });

})