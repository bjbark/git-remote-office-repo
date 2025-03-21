/**
 * cellEdit시 기존에는 마우스클릭 또는 cell에 enter했을때에만 cell이 edit상태로 바뀌게 되는데<br/>
 * 이것을 키보드의 function키 pageupdown, tab, alt와 같은 특수키를 제외한 문자, 숫자, 특수문자와 같은 입력이 들어왔을때도<br/>
 * cell이 edit상태로 바뀌게 수정하기위해 Ext의 Editing클래스를 상속받아서 일부 메서드를 override했다.
 * 
 * @author kdarkdev
 */
Ext.define('Axt.grid.plugin.Editing', {
    alias: 'editing.editing',
    extend: 'Ext.grid.plugin.Editing',
//    extend: 'Ext.AbstractPlugin',

    requires: [
        'Ext.grid.column.Column',
        'Ext.util.KeyNav'
    ],
    
    directInput : false,

    initKeyNavHeaderEvents: function() {
        var me = this;

        //
        me.keyNav = Ext.create('Ext.util.KeyNav', me.view.el, {
            enter: me.onEnterKey,
            esc: me.onEscKey,
            scope: me
        });
        
        // 
        if(me.directInput) {
        	me.keyMap = Ext.create('Ext.util.KeyMap', me.view.el,
        			{
        		key: [
        		      65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,
        		      94,95,96,97,98,99,100,101,102,103,104,105,110,111,106,107,109, 186, 187, 188, 189, 190, 191,192, 219,220,221,
        		      48,49,50,51,52,53,54,55,56,57,
        		      32,222
        		      // 112,113,114,115,116,117,118,119,120,121,122,123, (function key)
        		      //,37,38,39,40 (방향키)
        		      //,13 (엔터)
        		      //,27 (esc)
        		      ],
        		      fn: me.onEnterKey,
        		      scope:me
        			}
        	);
        }
    },

    // @private
    // cellEdit시에 기존내용 지우고 새로 입력하는 내용으로 곧바로 대체(directInput)하기 위해 수정함 (kdarkdev)
    onEnterKey: function(e) {
        var me = this,
            grid = me.grid,
            selModel = grid.getSelectionModel(),
            record,
            pos,
            columnHeader;

        // Calculate editing start position from SelectionModel if there is a selection
        // Note that the condition below tests the result of an assignment to the "pos" variable.
        if (selModel.getCurrentPosition && (pos = selModel.getCurrentPosition())) {
            record = pos.record;
            columnHeader = pos.columnHeader;
        }
        // RowSelectionModel
        else {
            record = selModel.getLastSelected();
            columnHeader = grid.columnManager.getHeaderAtIndex(0);
        }

        // If there was a selection to provide a starting context...
        if (record && columnHeader) {
        	var keyCode = null;
        	if(e.keyCode) {
        		keyCode = e.keyCode;
        	} else {
        		keyCode = e;
        	}
    		me.startEdit(record, columnHeader, null, keyCode);
        }
    }
    
});
