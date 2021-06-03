
# rule_automata

Gives out Cellular Automata in HTML5 Canvas written in Javascript.<br><br><br>
Change line<br><br>
<code>var r = new rule(cwidth, cheight, rule_30, pxPerSide, pxPerSide, canv);</code><br><br>
in <b>rule.js</b> to <br><br>
<code>var r = new rule(cwidth, cheight, rule_90, pxPerSide, pxPerSide, canv);</code><br><br>
for Rule 90<br><br><br>
If you want to implement your own rule so you need to create a boolean array wich describes the top neighbours order.
| 000 | 100 | 010 | 110 | 001 | 101 | 011 | 111 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| false | true | true | false | true | false | true | false |

Rule Array: <br><br>
<code>var customrule = [false, true, true, false, true, false, true, false];</code><br>
