Ext.define('lookup.popup.ftpimage.ImageMapPopup', { extend: 'Axt.popup.Search',
	alias   : 'widget.lookup-imagemap-popup',
	store   : 'lookup.popup.ftpimage.store.ImageMapPopup' ,
	requires:
	[
	 	'lookup.upload.FileUpload'
	],
	title   : '이미지 정보',
	closable: true,
	autoShow: true,

	width   : 900,
	height  : 455,
	layout  : {
		type: 'border'
    },
    defaultFocus : 'initfocused',

    initComponent: function(config){
        var me = this,
        	autoSelect = false
        ;
   		me.items = [me.createForm()];
        me.callParent(arguments);
		me.selectAction();
    },

    /**
     * 화면폼
     */
     createForm: function(){
    	var  me   = this,
    		 form = {
    			 xtype       : 'form-layout',
    			 region      : 'center',
    			 border      : false,
    			 dockedItems : [ me.createGrid() ],
    			 items       : [ me.createView() ] //
    		}
    	;
    	return form;
    },


    /**
     * 리스트
     * @return {Ext.grid.Panel} 리스트 그리드
     */
     createGrid: function(){
        var me = this, grid =
        {

        	xtype   : 'grid-panel',
        	header  : false,
        	dock     : 'left'       ,
        	width : 120,
        	//region  : 'west',
        	viewConfig: {
        		loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
        	},
        	//selModel:{ selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
        	store		: Ext.create( me.store ),
        	hideHeaders : true,
        	paging  	: {
        		xtype	: 'grid-paging',
        		pagingButton : false,
        		items	: [
        			 {xtype: 'button' , text : Const.INSERT.text , iconCls: Const.INSERT.icon, scope: me, handler: me.uploadAction, cls: 'button-style'},
        			 '->',//'-',
        		 	]
        		},

        		columns: [
	        		 {   dataIndex: 'file_url'		, flex : 1,
	        			 renderer: function(value){
	        			        return '<img src="' + value + '" height="90" width="120" />';
	        			        //<img src="smiley.gif" alt="Smiley face" height="42" width="42">
	        			  },

	        		 }
        		],
        		listeners: {
        			selectionchange: function(dataview, records, item, e) {
        				me.renderAction(records[0]);
        			}
        	   }
    		}
        ;
        return grid;
    },


    createView: function(){

    	var me = this,
    		form = {
    		xtype		: 'form-panel' ,
    		region		: 'center',
    		border		: 0 ,
    		bodyStyle	: { padding: '3px' },

    		dockedItems : [
    		 	{	xtype : 'toolbar',
    		 		dock  : 'bottom',
    		 		items : [
    				 	'->', '-',
    				 	{	text: Const.FINISH.text , iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'
				 		},{	text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style'
			 			}
    				]
    	        }
    		],
    		items	 : [
    		 	{	name       : 'cont_cont' ,
    		 		xtype      : 'htmleditor',
    		 		height     : 390 ,
    		 		maxLength  : 2000 ,
    		 		flex       : 1
    		 	}
    		]
    	};
    	return form;
    },

    /**
     * 조회
     */
    selectAction: function(){
        var me = this,
        	store = me.down('grid').getStore()
        ;
        if (me.popup.apiurl && me.popup.apiurl.search ) {
        	store.getProxy().api.read = me.popup.apiurl.search ;
        }
		store.load({
			params   : {param:JSON.stringify(me.popup.params )},
			scope    : me,
			callback : function(records, operation, success) {
			}
		});
    },

    renderAction: function( record ){
    	var me = this
    		panel  = me.down('form'),
    		editor = panel.down('[name=cont_cont]')
    	;
    	editor.setValue('<img src="' + record.get('file_url') + '" />' );
    },

    /**
     * 업로드 버튼 이벤트
     */
    uploadAction: function( records ){
    	var me = this
    	;
    	resource.loadPopup({
    		select : 'SINGLE',
    		widget : 'lookup-file-upload',
    		apiurl : me.popup.apiurl ,
    		option : {
    			extension : ['jpg', 'png', 'gif'],
			},
    		params : me.popup.params ,
    		result : function(records) {
    			console.debug( records );
    			me.selectAction();
    			Ext.Msg.alert( '', '업로드 성공 했습니다.' );
 			}
    	});
    },

    /**
     * 업로드 버튼 이벤트
     */
    deleteAction: function( records ){
    	var me = this,
    		lister = me.down('grid'),
    		select = lister.getSelectionModel().getSelection()[0]
    	;
    	if (!select){
			Ext.Msg.show({ msg: '이미지를 선택 하여 주시기 바랍니다.' , buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
			return;
    	}

    	if (Ext.isEmpty(select.get('file_url'))){
			Ext.Msg.show({ msg: '삭제할 이미지 정보가 없습니다.' , buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
			return;
		}
    },
    /**
     * 확인 버튼 이벤트
     */
     finishAction: function(){
    	 var me     = this,
    		record = me.down('form').getValues(),
    		cont_cont = Ext.String.trim(record.cont_cont)
    	;
    	if (Ext.isEmpty(cont_cont)) {
    		resource.showError( '컨텐츠 정보가 없습니다.'  );
    	} else {
    		me.setResponse(record);
    	}
    }
});


