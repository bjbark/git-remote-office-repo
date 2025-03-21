/**
 * 원본 소스를 extjs4 버전에 맞게 수정, drag/copy 기능은 생략
 *
 *
 * {@link http://developerextensions.com/index.php/extjs-excel-copypaste-grid}
 *
 */
Ext.define('Axt.grid.Excel', { extend: 'Axt.grid.Panel',



	selModel: { selType: 'cellmodel' },

//	multiSelect: true,
//    border: false,
//    stateful: false,
//    sortableColumns: false,
//    enableColumnHide: false,
//    enableColumnResize: false,
//    columnLines: true,

	viewConfig: {
		stripeRows: false,
	    markDirty: false,
		loadMask: false
	},

 	initComponent : function(config){
 		var me = this;
//		me.plugins = [Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 2 })],
		me.callParent(arguments);
 		me.on('render',me.addKeyMap, me);
 	},

 	/**
 	 * 키 이벤트 설정
 	 * @private
 	 */
 	addKeyMap: function(){
 		var me = this;
		new Ext.util.KeyMap({
		    target: this.getEl().dom,
		    binding: [{
		        key: "v",
		        ctrl:true,
		        fn: function(a,b,c,d,e,f){
		        	 me.getStore().loadData([],false);
		        	me.pasteFromClipBoard();
	        	}
		    }]
		});
	},

	/**
	 * grid로 붙여넣기
	 */
	pasteFromClipBoard:function(){
    	var hiddentextarea = this.getHiddenTextArea();

		hiddentextarea.dom.value ="";
    	hiddentextarea.focus();
    },

    /**
     * grid upate
     */
    updateGridData:function(){

    	var store = this.store;

    	var model = store.getProxy().getModel();
    	var fields = store.model.getFields();

		var Record = Ext.define('pastedRecord', {
		    extend: 'Axt.data.Model',
		    fields: fields
		});

    	var data = this.hiddentextarea.getValue().split("\n");
    	var dataLength = data.length;



		var gridTotalRows = store.getCount(); // total count

    	var position = this.getSelectionModel().getCurrentPosition();

		var nextIndex = position.row; // row index



		for(var rowIndex = 0; rowIndex < dataLength; rowIndex++ ){
			var row = data[rowIndex];
			if( this.trim(row) == '' ){
				continue;
			}
			var columns	= row.split("\t");
			if( nextIndex > gridTotalRows-1 ){
				store.add(new Record({}));
			}
			var pasteColumnIndex = position.column;
			for(var columnIndex=0; columnIndex < columns.length; columnIndex++ ){
				store.getAt(nextIndex).dirtyValue(model.getFields()[pasteColumnIndex].name, columns[columnIndex] );
				pasteColumnIndex++;
			}
			nextIndex++;
		}
		this.getView().refresh();
    	this.hiddentextarea.blur(); // blur 가 없을 경우 ctrl+v의 keyup은 이벤트 중복 발생
    },

    /**
     * hidden textarea
     * @return {}
     */
	getHiddenTextArea:function(){


		if(!this.hiddentextarea){
    		this.hiddentextarea = new Ext.Element(document.createElement('textarea'));

			this.hiddentextarea.setStyle('border','2px solid #ff0000');
			this.hiddentextarea.setStyle('position','absolute');
			this.hiddentextarea.setStyle('top','0px');
			this.hiddentextarea.setStyle('z-index','-1');
			this.hiddentextarea.setStyle('width','0px');
			this.hiddentextarea.setStyle('height','0px');
    		this.hiddentextarea.addListener('keyup', this.updateGridData, this);
    		Ext.get(this.getEl().dom.firstChild).appendChild(this.hiddentextarea.dom);
    	}
    	return this.hiddentextarea;
    },

    trim: function(str){
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

});