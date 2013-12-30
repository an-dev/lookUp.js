[lookUp.js](#)
==========================

This jQuery plugin is used to control various element in a form. When the end user changes values of input elements, the plugin shows which element where changed, and alerts the user that he has to submit the changes before doing other actions (e.g.: move out of the page)

Tested in Firefox 3+, Google Chrome 10+, Safari 5+, Internet Explorer 8+.



## Usage ##

```javascript
$(document).ready(function(){
    $('#myform').lookUp();
}); 
```

```html
<form id="myform">
  <input type="text" value="here's default value" />
  <input type="submit" value="save" />
</form>
```

show user the changes, by adding class 'changed' to the css:

```css
<style>
.changed {
  color: #B94A48;
  background-color: #F2DEDE;
  border-color: #EED3D7;
}
</style>
```

## Options ##

All options override default values.

**changeClass**

Change class for modified elements, default value is 'changed'. 

```javascript
$(document).ready(function(){
    $('#myform').lookUp({
      changeClass: "alert-color"
    });
}); 
```

**msg**

Change confirm message.

```javascript
$(document).ready(function(){
    $('#myform').lookUp({
      msg: "Le modifiche non salvate verranno perse. Pazzo!"
    });
}); 
```

**windowEvent**

Enable/Disable window event handling, by default disabled.

```javascript
$(document).ready(function(){
    $('#myform').lookUp({
      windowEvent: true
    });
}); 
```

## Demo ##

* [coming soon](#)


