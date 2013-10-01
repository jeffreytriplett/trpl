TRPL Instructions
=================
- Include trpl.js in your project.
- Use trpl.process(s, d) to populate a template (from string 's') with data (from object 'd').  The function will return the resulting string.
- Include trpl.html.js in your project to use trpl.processElement(e, d).  This function will process the template held in the first comment of DOM element 'e' with object 'd' and write the output inside of 'e'.
- trpl.html.js is just one way to use TRPL.  You can decide to just use trpl.js and find your own way to pass in the template and use the resulting string.  This allows it to be used in node.js as a server side templating engine if you want.
- The follwing explains how to code the templates...

Accessing objects
-----------------
{id} --> Writes value located at 'id' in the current object to the output.
  --> If value located at 'id' is an object, it will write a string representation of the object
  --> If value is undefined, null, an empty string or empty array, it will be ignored
  
{id| template } -->  Reads value located at 'id' in the current object and uses that new object for the template between the brackets.
  --> If value is undefined, null, an empty string or empty array, it will be ignored

Parents
-------
{$} --> Writes the object used in the bracket surrounding the current bracket to output.
  --> can use multiple '$'s to access parents further up
  
{$| template } --> Retrieves the object used in the bracket surrounding the current bracket and uses it for the template inside this set of brackets.
  --> can use multiple '$'s to access parents further up

Arrays
------
{#} --> Writes the length of the current object to the output.

{#num| template } --> Creates a new array by splitting the current array into 'num' equal parts and uses the new array for the template between the brackets.
  --> If 'num' is positive, the elements that are left over from the division will be spread evenly into the first elements in the array.
  --> If 'num' is negative, the elements that are left over from the division will be spread evenly into the last elements in the array.

Loops
-----
{%} --> Writes the counter of the current loop to the output (1-based).

{%num| template } --> Splits current array into sets of 'num' elements and populates the template between the brackets for each set.
  --> If 'num' is negative it will read the array in reverse order when creating the sets.
  --> If 'num' equals 1 (or -1), it will populate the template between the brackets with each element in the array.

* use '?' after any of the above calls to force it to use the value even if it is undefined or null.
  --> using '?' after a loop will force it to use each value in the array

Conditions
----------
{=} --> Writes 'true' if current object exists.  Writes 'false' otherwise.  (note: will always be 'true' unless object was retrieved with '?', then it could be either 'true' or 'false')

{!} --> Writes 'true' if current object does not exist. Writes 'false' otherwise. (note: object must have been retrieved with '?' for this to even have the possibility of returning 'true')

{=| tempalate } --> Populates template if current object exists.  (note: will always be 'true' unless object was retrieved with '?', then it could be either 'true' or 'false')

{!| tempalate } --> Populates template if current object does not exist.  (note: object must have been retrieved with '?' for this to even have the possibility of returning 'true')

{=val} --> Writes 'true' if current object is equal to 'val'.  Writes 'false' otherwise.

{!val} --> Writes 'true' if current object is not equal to 'val'.  Writes 'false' otherwise.

{<val} --> Writes 'true' if current object is less than 'val'.  Writes 'false' otherwise.

{>val} --> Writes 'true' if current object is greater than 'val'.  Writes 'false' otherwise.

{=val| template } --> Populates template if object equals 'val'.

{!val| template } --> Populates template if object does not equal 'val'.

{<val| template } --> Populates template if object is less than 'val'.

{>val| template } --> Populates template if object is greater than 'val'.

* If the current object represents the index of a loop and 'val' is a negative integer, 'val' will represent the index from the end of the array.
* The template inside a bracket with condition symbols will continue to use object that was being used before.

Chaining
--------
The above actions can be combined into a single call in the following order.  

1) Parent '$' symbols to get the parent object to read from.

2) 'id's separated by '$' symbols to get child object.  If 'id' is an integer and object being retrieved from is an array, it will access the element at that index (1-based).

3) '#' to get length or '#num' to split up array

4) '%' if 1-3 are empty or '%num' to loop through elements in array

5) '?' if you want the template to run whether or not the object (or objects in loop) is found

* You can add '=', '!', '=val', '!val', '<val', >val' in chain to run comparison only if '%num' wasn't found or chain starts with '%' and was used without 'num'.
