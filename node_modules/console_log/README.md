# console_log
 Logger with formatter.
 
 This Logger accepts the argument and formats it before logging apart from logging at different levels.
 
 ## install
 
 ```
npm install console_log
```
## usage
```js
Placeholders may contain numbers which refer to positional arguments:

const msg1 = '{0}, you have {1} unread message{2}';
log.info('Holly', 2, 's');
// => 'Holly, you have 2 unread messages' 
Unmatched placeholders produce no output:

'{0}, you have {1} unread message{2}';
log.warn('Steve', 1);
// => 'Steve, you have 1 unread message' 
A format string may reference a positional argument multiple times:

"The name's {1}. {0} {1}."
log.debug('James', 'Bond');
// => "The name's Bond. James Bond." 


```
## license

MIT.
