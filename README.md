# JQuery-HTML5-Drag-Drop
Provides easy drag and drop features with HTML5

## Usage

```javascript
    $(selector).draggable(config);
    $(selector2).droppable(config2);
```

### Configuration Object

#### Draggable
- **dragImage** *(string|object)*
  This is the image to display when dragging.
  If value is string, it is the path to the image file.
  If value is object, it has keys `src`, `offsetX`, `offsetY` where the last two are where the image should appear relative to the mouse pointer

- **dropEffect** *(string)*
  This is the type of drag and drop being done. 
  Values may be any of `none`, `move`, `copy` and `link`

- **effectAllowed** *(string)*
  Provides all types of operations possible
  Values may be any of `none`, `move`, `copy`, `link`, `copyMove`, `copyLink`, `linkMove`, and `all`

- **sortable** *(boolean)*
  Indicates that the draggable elements should also be able to drop on one another to effect sorting

- **drag** *(function)*
  Fired when an element or text selection is being dragged.

- **start** *(function)*
  Fired when the user starts dragging an element or text selection.

- **end** *(function)*
  Fired when a drag operation is being ended (for example, by releasing a mouse button or hitting the escape key)

- **enter** *(function)*
  Fired when a dragged element or text selection enters a valid drop target.

- **leave** *(function)*
  Fired when a dragged element or text selection leaves a valid drop target.

- **exit** *(function)*
  Fired when an element is no longer the drag operation's immediate selection target.

- **over** *(function)*
  Fired when an element or text selection is being dragged over a valid drop target (every few hundred milliseconds)

- **drop** *(function)*
  Fired when an element or text selection is dropped on a valid drop target.

- **sorted** *(function)*
  Fired when an element has been sorted.

#### Droppable

- **over** *(function)*
  Fired when an element or text selection is being dragged over a valid drop target (every few hundred milliseconds)

- **drop** *(function)*
  Fired when an element or text selection is dropped on a valid drop target.

### About Functions
All functions, with the exception of `drop` and `sorted`, have two parameters which are the event and DataTransfer objects.
`drop` takes three parameters - the dropped element, the event object and the DataTransfer object.
`sorted` takes only one parameter which is the draggable element on which the sorted element was dropped.

## Examples
See the [index.html](https://github.com/ezra-obiwale/JQuery-HTML5-Drag-Drop/blob/master/index.html)

## Demo
See [here](http://localhost/ezra-obiwale.github.io/jquery-html5-drag-drop/)

## Further reading
 https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/

## License
Released under the [MIT license](http://www.opensource.org/licenses/MIT)
