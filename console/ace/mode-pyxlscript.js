define("ace/mode/pyxlscript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var PyxlScriptHighlightRules = function() {

    var keywords = "assert|debug_pause|debug_print|debug_watch|let|const|mod|local|preserving_transform|for|in|while|until|if|then|else|push_mode|reset_game|set_mode|return|def|break|continue|default|bitand|bitnot|bitor|bitxor|bitnot|bitshl|bitshr|because|quit_game|launch_game|∈|∊";

    var builtinConstants = "deg|true|false|nan|SCREEN_SIZE|pi|epsilon|infinity|nil|∞|½|⅓|⅔|¼|¾|⅕|⅖|⅗|⅘|⅙|⅐|⅛|⅑|⅒|°|ε|π|∅|∞|⁰|¹|²|³|⁴|⁵|⁶|⁷|⁸|⁹|ASSET_CREDITS";

    var builtinFunctions = (
        "ray_intersect|draw_bounds|draw_disk|reset_clip|reset_transform|set_clip|draw_line|draw_sprite_corner_rect|intersect_clip|draw_point|draw_corner_rect|draw_rect|get_background|set_background|text_width|get_sprite_pixel_color|draw_sprite|draw_text|draw_tri|draw_poly|get_transform|get_clip|rotation_sign|sign_nonzero|set_transform|xy|xz_to_xyz|xy_to_xyz|xz|xyz|any_button_press|draw_map|get_mode|get_previous_mode|get_map_pixel_color|get_map_pixel_color_by_draw_coord|get_map_sprite|set_map_sprite|get_map_sprite_by_draw_coord|set_map_sprite_by_draw_coord|unparse|format_number|uppercase|lowercase|" +
            "ray_value|play_audio_clip|resume_sound|stop_sound|game_frames|mode_frames|delay|sequence|add_frame_hook|remove_frame_hook|make_entity|draw_entity|overlaps|entity_update_children|entity_simulate|split|now|game_frames|mode_frames|replace|find_map_path|find_path|join|entity_apply_force|entity_apply_impulse|gray|rgb|rgba|hsv|hsva|last_value|last_key|insert|reverse|reversed|call|set_post_effects|get_post_effects|reset_post_effects|push_front|local_time|device_control|physics_add_contact_callback|physics_entity_contacts|physics_entity_has_contacts|physics_add_entity|physics_remove_entity|physics_remove_all|physics_attach|physics_detach|make_physics|make_contact_group|draw_physics|physics_simulate|" +
            "abs|acos|atan|asin|sign|sign_nonzero|cos|clamp|hash|lerp|log|log2|log10|loop|noise|oscillate|overlap|pow|make_random|random_sign|random_integer|random_within_sphere|random_on_sphere|random_within_circle|random_within_square|random_on_square|random_on_circle|random_direction2D|random_direction3D|random_value|random_gaussian|random_gaussian2D|random_truncated_gaussian|random_truncated_gaussian2D|random|ξ|sgn|sqrt|sin|set_random_seed|tan|conncatenate|extend|clone|copy|draw_previous_mode|cross|direction|dot|equivalent|magnitude|magnitude_squared|max_component|min_component|xy|xyz|" +
            "fast_remove_key|find|keys|remove_key|substring|sort|resize|push|pop|pop_front|push_front|fast_remove_value|remove_values|remove_all|gamepad_array|joy|round|floor|ceil|debug_print");

    var keywordMapper = this.createKeywordMapper({
        "invalid.deprecated": "_^",
        "support.function": builtinFunctions,
        "constant.language": builtinConstants,
        "keyword": keywords,
        "variable.language": "_^"
    }, "identifier");

    var strPre = "[uU]?";
    var strRawPre = "[rR]";
    var strFormatPre = "[fF]";
    var strRawFormatPre = "(?:[rR][fF]|[fF][rR])";
    var decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
    var octInteger = "(?:0[oO]?[0-7]+)";
    var hexInteger = "(?:0[xX][\\dA-Fa-f]+)";
    var binInteger = "(?:0[bB][01]+)";
    var integer = "(?:" + decimalInteger + "|" + octInteger + "|" + hexInteger + "|" + binInteger + ")";

    var exponent = "(?:[eE][+-]?\\d+)";
    var fraction = "(?:\\.\\d+)";
    var intPart = "(?:\\d+)";
    var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
    var exponentFloat = "(?:(?:" + pointFloat + "|" + intPart + ")" + exponent + ")";
    var floatNumber = "(?:" + exponentFloat + "|" + pointFloat + ")";

    var stringEscape = "\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";

    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "//.*$"
            },
            {
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "multilinecomment"
            },
            {
                token : "string",           // multi line """ string start
                regex : strPre + '"{3}',
                next : "qqstring3"
            }, {
                token : "string",           // " string
                regex : strPre + '"(?=.)',
                next : "qqstring"
            }, {
                token : "string",           // multi line ''' string start
                regex : strPre + "'{3}",
                next : "qstring3"
            }, {
                token : "string",           // ' string
                regex : strPre + "'(?=.)",
                next : "qstring"
            }, {
                token: "string",
                regex: strRawPre + '"{3}',
                next: "rawqqstring3"
            }, {
                token: "string", 
                regex: strRawPre + '"(?=.)',
                next: "rawqqstring"
            }, {
                token: "string",
                regex: strRawPre + "'{3}",
                next: "rawqstring3"
            }, {
                token: "string",
                regex: strRawPre + "'(?=.)",
                next: "rawqstring"
            }, {
                token: "string",
                regex: strFormatPre + '"{3}',
                next: "fqqstring3"
            }, {
                token: "string",
                regex: strFormatPre + '"(?=.)',
                next: "fqqstring"
            }, {
                token: "string",
                regex: strFormatPre + "'{3}",
                next: "fqstring3"
            }, {
                token: "string",
                regex: strFormatPre + "'(?=.)",
                next: "fqstring"
            },{
                token: "string",
                regex: strRawFormatPre + '"{3}',
                next: "rfqqstring3"
            }, {
                token: "string",
                regex: strRawFormatPre + '"(?=.)',
                next: "rfqqstring"
            }, {
                token: "string",
                regex: strRawFormatPre + "'{3}",
                next: "rfqstring3"
            }, {
                token: "string",
                regex: strRawFormatPre + "'(?=.)",
                next: "rfqstring"
            }, {
                token: "keyword.operator",
                regex: "\\+|\\-|\\*|\\/|\\/\\/|<<|>>|\\||\\^|~|<|>|<=|=>|==|!=|<>|=|‖|⌊|⌋|⌈|⌉"
            }, {
                token: "punctuation",
                regex: ",|:|;|\\->|\\+=|\\-=|\\*=|\\/=|\\/\\/=|>>=|<<="
            }, {
                token: "paren.lparen",
                regex: "[\\[\\(\\{]"
            }, {
                token: "paren.rparen",
                regex: "[\\]\\)\\}]"
            }, {
                token: "text",
                regex: "\\s+"
            }, {
                include: "constants"
            }],
        
        "multilinecomment": [
            {
                token: "comment",
                regex: '\\*\\/',
                next: "start"
            },
            {
                defaultToken: "comment"
            }
        ],
        "qqstring3": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string", // multi line """ string end
            regex: '"{3}',
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "qstring3": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string",  // multi line ''' string end
            regex: "'{3}",
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "qqstring": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string",
            regex: "\\\\$",
            next: "qqstring"
        }, {
            token: "string",
            regex: '"|$',
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "qstring": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string",
            regex: "\\\\$",
            next: "qstring"
        }, {
            token: "string",
            regex: "'|$",
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "rawqqstring3": [{
            token: "string", // multi line """ string end
            regex: '"{3}',
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "rawqstring3": [{
            token: "string",  // multi line ''' string end
            regex: "'{3}",
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "rawqqstring": [{
            token: "string",
            regex: "\\\\$",
            next: "rawqqstring"
        }, {
            token: "string",
            regex: '"|$',
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "rawqstring": [{
            token: "string",
            regex: "\\\\$",
            next: "rawqstring"
        }, {
            token: "string",
            regex: "'|$",
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "fqqstring3": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string", // multi line """ string end
            regex: '"{3}',
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "fqstring3": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string",  // multi line ''' string end
            regex: "'{3}",
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "fqqstring": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string",
            regex: "\\\\$",
            next: "fqqstring"
        }, {
            token: "string",
            regex: '"|$',
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "fqstring": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string",
            regex: "'|$",
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "rfqqstring3": [{
            token: "string", // multi line """ string end
            regex: '"{3}',
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "rfqstring3": [{
            token: "string",  // multi line ''' string end
            regex: "'{3}",
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "rfqqstring": [{
            token: "string",
            regex: "\\\\$",
            next: "rfqqstring"
        }, {
            token: "string",
            regex: '"|$',
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "rfqstring": [{
            token: "string",
            regex: "'|$",
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "fqstringParRules": [{//TODO: nested {}
            token: "paren.lparen",
            regex: "[\\[\\(]"
        }, {
            token: "paren.rparen",
            regex: "[\\]\\)]"
        }, {
            token: "string",
            regex: "\\s+"
        }, {
            token: "string",
            regex: "'(.)*'"
        }, {
            token: "string",
            regex: '"(.)*"'
        }, {
            token: "function.support",
            regex: "(!s|!r|!a)"
        }, {
            include: "constants"
        },{
            token: 'paren.rparen',
            regex: "}",
            next: 'pop'
        },{
            token: 'paren.lparen',
            regex: "{",
            push: "fqstringParRules"
        }],
        "constants": [            {
            token : "constant.numeric",
            regex: "[%°∞½⅓⅔¼¾⅕⅖⅗⅘⅙⅐⅛⅑⅒°επ∅∞⁰¹²³⁴⁵⁶⁷⁸⁹]"},
                                  {
            token: "constant.numeric", // imaginary
            regex: "(?:" + floatNumber + "|\\d+)[jJ]\\b"
        }, {
            token: "constant.numeric", // float
            regex: floatNumber
        }, {
            token: "constant.numeric", // long integer
            regex: integer + "[lL]\\b"
        }, {
            token: "constant.numeric", // integer
            regex: integer + "\\b"
        }, {
            token: ["punctuation", "variable"],// method
            regex: "(\\.)([a-zA-Z_]+)\\b"
        }, {
            token: keywordMapper,
            regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }]
    };
    this.normalizeRules();
};

oop.inherits(PyxlScriptHighlightRules, TextHighlightRules);

exports.PyxlScriptHighlightRules = PyxlScriptHighlightRules;
});

define("ace/mode/folding/pyxlscriptic",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(markers) {
    this.foldingStartMarker = new RegExp("([\\[{])(?:\\s*)$|(" + markers + ")(?:\\s*)(?:#.*)?$");
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) {
            if (match[1])
                return this.openingBracketBlock(session, match[1], row, match.index);
            if (match[2])
                return this.indentationBlock(session, row, match.index + match[2].length);
            return this.indentationBlock(session, row);
        }
    };

}).call(FoldMode.prototype);

});

define("ace/mode/pyxlscript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/pyxlscript_highlight_rules","ace/mode/folding/pyxlscriptic","ace/range"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var PyxlScriptHighlightRules = require("./pyxlscript_highlight_rules").PyxlScriptHighlightRules;
var PyxlScriptFoldMode = require("./folding/pyxlscriptic").FoldMode;
var Range = require("../range").Range;

var Mode = function() {
    this.HighlightRules = PyxlScriptHighlightRules;
    this.foldingRules = new PyxlScriptFoldMode("\\:");
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "//";

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start") {
            var match = line.match(/^.*[\{\(\[:]\s*$/);
            if (match) {
                indent += tab;
            }
        }

        return indent;
    };

    var outdents = {
        "pass": 1,
        "return": 1,
        "raise": 1,
        "break": 1,
        "continue": 1
    };
    
    this.checkOutdent = function(state, line, input) {
        if (input !== "\r\n" && input !== "\r" && input !== "\n")
            return false;

        var tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;
        
        if (!tokens)
            return false;
        do {
            var last = tokens.pop();
        } while (last && (last.type == "comment" || (last.type == "text" && last.value.match(/^\s+$/))));
        
        if (!last)
            return false;
        
        return (last.type == "keyword" && outdents[last.value]);
    };

    this.autoOutdent = function(state, doc, row) {
        
        row += 1;
        var indent = this.$getIndent(doc.getLine(row));
        var tab = doc.getTabString();
        if (indent.slice(-tab.length) == tab)
            doc.remove(new Range(row, indent.length-tab.length, row, indent.length));
    };

    this.$id = "ace/mode/pyxlscript";
}).call(Mode.prototype);

exports.Mode = Mode;
});                (function() {
                    window.require(["ace/mode/pyxlscript"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            