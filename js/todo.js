/*!
 * 静态调试区域
 * project:
 * - https://github.com/Alice-Jie/AudioVisualizer
 * - https://gitee.com/Alice_Jie/circleaudiovisualizer
 * - http://steamcommunity.com/sharedfiles/filedetails/?id=921617616
 * @license MIT licensed
 * @author Alice
 * @date 2017/07/28
 */

(function ($, window, document, Math) {

    'use strict';

// IEFE
(() => { 
    // state variables
    let toDoListArray = [];
    // ui variables
    const form = document.querySelector(".form"); 
    const input = form.querySelector(".form__input");
    const ul = document.querySelector(".toDoList"); 
    input.addEventListener('focus',function(){
       //监听聚焦
      var plan = window.prompt("your plan");
      input.value = plan;
    })
    // event listeners
    form.addEventListener('submit', e => {
      // prevent default behaviour - Page reload
      e.preventDefault();
      // give item a unique ID
      let itemId = String(Date.now());
      // get/assign input value
      let toDoItem = input.value;
      //pass ID and item into functions
      addItemToDOM(itemId , toDoItem);
      addItemToArray(itemId, toDoItem);
      // clear the input box. (this is default behaviour but we got rid of that)
      input.value = '';
    });
    
    ul.addEventListener('click', e => {
      let id = e.target.getAttribute('data-id')
      if (!id) return // user clicked in something else      
      //pass id through to functions
      removeItemFromDOM(id);
      removeItemFromArray(id);
    });
    
    // functions 
    function addItemToDOM(itemId, toDoItem) {    
      // create an li
      const li = document.createElement('li')
      li.setAttribute("data-id", itemId);
      // add toDoItem text to li
      li.innerText = toDoItem
      // add li to the DOM
      ul.appendChild(li);
    }
    
    function addItemToArray(itemId, toDoItem) {
      // add item to array as an object with an ID so we can find and delete it later
      toDoListArray.push({ itemId, toDoItem});
      console.log(toDoListArray)
    }
    
    function removeItemFromDOM(id) {
      // get the list item by data ID
      var li = document.querySelector('[data-id="' + id + '"]');
      // remove list item
      ul.removeChild(li);
    }
    
    function removeItemFromArray(id) {
      // create a new toDoListArray with all li's that don't match the ID
      toDoListArray = toDoListArray.filter(item => item.itemId !== id);
      console.log(toDoListArray);
    }
    
  })();

    //--------------------------------------------------------------------------------------------------------------

})(jQuery, window, document, Math);