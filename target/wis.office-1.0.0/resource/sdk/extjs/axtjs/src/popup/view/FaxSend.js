
Ext.define('Axt.popup.view.FaxSend', { extend: 'Axt.popup.Search',

	 alias   : 'widget.popup-fax-send',
	 id      : 'popup-fax-send',
	 requires:
	 [
	 	'Axt.form.Layout',
	 	'Axt.form.Search',
	 	'Axt.grid.Panel',
	 	'Axt.tab.Panel'
	 ],
	 title   : 'FAX 전송',
	 closable: true,
	 autoShow: true,
     width   : 700,
	 height  : 500,
	 layout  : {
        type : 'border'
     },

	 defaultFocus : 'initfocused',

	 /**
	 * 허용되는 확장자
	 */
	 allowExtension : [], // 빈 배열은 무제한


     initComponent: function(config){
        var me = this;
	        me.items = [me.createForm()];

        	me.callParent(arguments);

        	url = me.params.url ;

        	me.down('form').loadRecord(me.values.record); /* form 에 record 입력 */
        	me.down('grid').reconfigure( me.values.record.records() ); /* 그리드 재설정 */

        	/* 팝업 form 각 항목에 데이터 입력 */
//        	me.down('form').down('[name=select_count]').setText( me.values.record.records().getCount() || '0' ); /* 그리드 record 합계 입력 */
        	var count = me.down('grid').getStore().getCount() ; /* 수신자 수 */
    		me.down('form').down('[name=select_count]').setText(count); //= count.toString() ; /* 수신자 수 입력 */

    },
	  createForm: function(){
	 	var  me   = this,
	 		 form = {
	 			 xtype         : 'form',
	 			 bodyStyle     : { padding: '0', background: 'transparent' },
	 			 width         : 690,
	 			 height        : 468, // 490
	 			 name          : 'createForm',
	 		 	 layout        : { type: 'hbox' },
	 		 	 fieldDefaults : { labelWidth : 70, labelSeparator : '', width : 310 },
				 dockedItems : [
			    	{
			    		xtype : 'toolbar',
			    		dock  : 'bottom',
			    		items : [
					    	{   xtype      : 'tbfill'},
			    		 	{   xtype      : 'button'     , text: '전송' , iconCls: Const.UPDATE.icon, scope: me, handler: me.finishAction},
			    		 	{   xtype      : 'tbseparator'},
			    		 	{   xtype      : 'button'     , text: Const.CANCEL.text , iconCls: Const.CANCEL.icon, scope: me, handler: me.close}
			    		]
			    	}
			    ],
	 		 	items         : [
	 		 	     {	xtype  : 'fieldcontainer',
	 		 			layout : { type: 'vbox', align: 'stretch' },
	 		 			margin : '30 0 0 20',
	 		 			items  : [
	 		 	 			{   xtype   : 'label',
	 			 				text 	: '제목',
	 			 				margin : '0 0 10 0'
	 			 			},
	 					 	{   xtype     	: 'searchfield',
	 					 		labelWidth  : 35 ,
	 					 	    name  		: 'subject'
	 					 	},
	 		 		 	    {	xtype  : 'fieldcontainer',
	 		 		 			layout : { type: 'hbox', align: 'stretch' },
	 		 		 			border : 0,
	 		 		 			margin : '20 0 10 0',
	 		 		 			items  : [
	 		 	 					{   xtype   : 'label',
	 			 					 	text 	: 'FAX 첨부파일',
	 			 					}
	 		 		 			]
	 		 		 	    },
	 		    		 	{
	 		    		 		xtype 	: 'form-panel',
	 		    		 		name 	: 'uploadForm',
	 		    		 		region:'center',
	 		    		 		standardSubmit: false,
	 		    		 		url 	:  _global.api_host_info + "/" + _global.api_path +"/services/fax/sender.do" ,
	 		    		 		timeout : 120000,
	 		    		 		method	: 'POST',
	 		    		 		layout	: {
	 		    		 		    type: 'vbox',
	 		    		 		    align:'center'
	 				 			},
	 				 			border : 1 ,
	 				 			renderTo: Ext.getBody(),
	 		    		 		items:[
	 		    		 		    {   xtype 		: 'filefield',
	 		    		 		 		name 		: 'files',
	 		    		 		 		msgTarget 	: 'side',
	 		    		 		 		allowBlank 	: false,
	 		    		 		 		anchor 		: '100%',
	 		    		 		 		width       : 300,
	 		    		 		 		style       : 'margin-top:10px;',
	 		    		 		 		buttonText 	: '선택',
	 		       		 		 		regex       : new RegExp('.+(' + me.allowExtension.join('|\.') + ')$', 'i')}, // 확장자 제한 정규식

	 		    		 		 	{xtype:'hiddenfield', name:'param', value:'' },
	 		    		 		 	{xtype:'hiddenfield', name:'token', value:_global.token_id },
	 		    		 		]
	 		    		 	},
			 		 		{   xtype      : 'textfield',
			 		 		  	name       : 'method',
			 		 		   	hidden     : true
			 		 		},
			 		 		{   xtype      : 'textfield',
			 		 		   	name       : 'attach',
			 		 		   	hidden     : true
			 		 		},
			 		 		{   xtype      : 'textfield',
			 		 		  	name       : 'provider',
			 		 		   	hidden     : true
			 		 		},
			 		 		{   xtype      : 'textfield',
			 		 		   	name       : 'accounts',
			 		 		   	hidden     : true
			 		 		},
			 		 		{   xtype      : 'textfield',
			 		 		   	name       : 'stor_id',
			 		 		   	value      : _global.hq_id,
			 		 		   	hidden     : true
			 		 		},
			 		 		{   xtype      : 'textfield',
			 		 		   	name       : 'schedule',
			 		 		   	hidden     : true
			 		 		},
			 		 		{   xtype      : 'textfield',
			 		 		   	name       : 'attribute',
			 		 		   	hidden     : true
			 		 		}

	 		 			]
	 		 		 } 	,
			 	     {	xtype  : 'fieldcontainer',
	 		 			layout : { type: 'vbox', align: 'stretch' },
	 		 			margin : '30 0 0 20',
	 		 			items  : [
	 		 		 	 	{   xtype   : 'label',
	 		 			 		text 	: '발신번호',
	 			 				margin : '0 0 10 0'
	 		 			 	},
	 		 				{   xtype     	: 'searchfield',
	 		 					name  		: 'callback',
	 		 					allowBlank	: false,
	 		 					labelWidth  : 60 ,
	 		 					vtype       : 'mobile'
	 		 				},
	 		 		 	    {	xtype  : 'fieldcontainer',
	 		 		 			layout : { type: 'hbox', align: 'stretch' },
	 		 		 			border : 0,
	 		 		 			margin : '20 0 10 0',
	 		 		 			items  : [
	 		 	 					{   xtype   : 'label',
	 			 					 	text 	: '수신',
	 			 					} ,
	 		 	 					{   xtype   : 'label',
	 			 						margin  : '0 0 0 250',
	 			 						name    : 'select_count',
	 			 						width   : 20,
	 			 					 	text 	: '0',
	 			 					} ,
	 		 	 					{   xtype   : 'label',
	 			 						margin  : '0 0 0 5',
	 			 					 	text 	: '명',
	 			 					}
	 		 		 			]
	 		 		 	    },
	 		 				{   xtype     	: me.createGrid(), //'textfield'
	 		 		 	    	width       : 310,
	 		 		 	    	height      : 300
	 		 				}
	 		 			]
	 		 		}
	 		 	 ]
	     	}
	 	;
	     return form;
	 },
	 createGrid: function(){
	     var  me = this,
	     	grid = {
	     		xtype   : 'grid-panel',
	     		header  : false,
	     		region  : 'center',
		 	    width   : 310,
	 		 	height  : 300,
	 		 	border  : 1,
	 			selModel: {selType:'cellmodel'},
	 			plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	     		viewConfig: {
	     			loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
	     		},
	       		paging   :
	    		{
	    			xtype: 'grid-paging',  pagingButton : false,
	    			items: [
	    		 		'->',
	    		 		{xtype: 'button' , text : Const.INSERT.text, iconCls: Const.INSERT.icon , scope: me, handler: me.insertAction , cls: 'button-style'}
	    		 	]
	    		},
	     		columns:
	     		[
		        		 {   dataIndex: 'receive'		, width: 164, text: Language.get('',   '수신자명'  ) , tdCls : 'editingcolumn',
					 		  editor: {
						 	      xtype        : 'textfield',
						 		  selectOnFocus: true,
						 		  listeners    : {
						 		      specialkey: function(field, e){
							 			  if (e.getKey() === e.ENTER) {
							 				  field.ownerCt.grid.view.getSelectionModel().onKeyDown();

							 			  }
						 			  }
						 		  }
						 	  }
		        		 },
		        		 {   dataIndex: 'address'		, width: 124, text: Language.get('',   	'팩스번호' ) , tdCls : 'editingcolumn',
					 		  editor: {
						 	      xtype        : 'textfield',
						 		  selectOnFocus: true,
						 		  vtype        : 'mobile',
						 		  listeners    : {
						 		      specialkey: function(field, e){
							 			  if (e.getKey() === e.ENTER) {
							 				  field.ownerCt.grid.view.getSelectionModel().onKeyDown();

							 			  }
						 			  }
						 		  }
						 	  }
		        		 },
		        		 {   xtype : 'actioncolumn',
		        			 width : 20,
		        			 items : [
		        			     {   iconCls: Const.DELETE.icon, // Use a URL in the icon config
		        			    	 scope  : this,
				        			 handler: function(grid, rowIndex, colIndex) {
					        			 var rec = grid.getStore().getAt(rowIndex);
					        			 this.deleteAction(rec);
				        			 }
		        			     }
		        			 ]
		        		 }
	     		],
	     		listeners: {

		       			 render: function(){
		       				var me = this
		       				;
		       				new Ext.util.KeyMap({
		       					 target: me.getEl(),
		       					 eventName : 'keyup',
		       					 binding: [{ key: Ext.EventObject.ENTER ,fn: function(key,e) { me.fireEvent('itemclick', me.getView() ); }}]
		       				});
		       			}
		       	}
	 		}
	     ;
	     return grid;
	 },
    finishAction: function(){
    	var me = this ,
    	    form = me.down('form'),
    	    record = form.getRecord(),
    	    values = form.getValues(),
		    master = me.down('grid'),
		    removeitem = [],
		    bytes   = 0
    	;

    	record.set(values);

    	var file = form.down('form').down('[name=files]').getValue() ;

	   	if( !file ){  /* 내용 입력 여부 체크 */
			Ext.Msg.show({ title: '알림', msg: "파일을 선택해 주시기 바랍니다."
				, icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me
			});
			return;
	   	}

 		var store = Ext.create('Axt.data.Store' , {

 			model: 'Axt.data.message.Content',
 			autoLoad: false,
 			pageSize: 17,
 			proxy:{
 				api:{
 					update : url
 				},
 				actionMethods: { read: 'POST'  },
 				extraParams:{ token : _global.token_id }
 			}
 		});

 		store.add( record );

 		store.getAt(0).set('schedule', Ext.Date.format(new Date(),'YmdHis') ); /* 전송시간 입력 */
 		store.getAt(0).set('callback', store.getAt(0).get('callback').replace(/-/g,"") ); /* 발신번호 정리 */

	   	store.getAt(0).records().each( function( item ) {

			if( item.get('address') ) {

				var rgEx = /(\d{2}|\d{3}|\d{4})[-](\d{4}|\d{3})[-]\d{4}$/g ;
				var rgEx1 = /(\d{2}|\d{3}|\d{4})(\d{4}|\d{3})\d{4}$/g ;
				var OK = rgEx.exec( item.get('address') );
				var OK1 = rgEx1.exec( item.get('address') );

				if( OK || OK1 ){
					item.set('address',  item.get('address').replace(/-/g,"")  );
					 item.dirty = true ;
				} else {
					removeitem.push(item);
				}

			} else {
				 removeitem.push(item);
			}

		});

		store.getAt(0).records().remove(removeitem); /* 실제 전화번호가 아닌경우 삭제 */

	   	if( store.getAt(0).records().getCount() < 1 ){ /* 실제 전송 갯수 < 1 */

			Ext.Msg.show({ title: '알림', msg: "FAX번호를 입력해 주시기 바랍니다."
						, icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me
			});
			return;
	   	}


		var param = {};
		var value = store.getAt(0);
	    param.records = [];
	    param.records.push({
	    	stor_id 	: value.get('stor_id'),
	    	provider 	: value.get('provider'),
	    	accounts 	: value.get('accounts'),
	    	callback 	: value.get('callback'),
	    	dispatch 	: value.get('dispatch'),
	    	schedule 	: value.get('schedule'),
	    	attribute 	: value.get('attribute'),
	    	subject		: value.get('subject'),
	    	method 		: '20',
	    	attach 		: ''
	    });

		param.records[0].records   = [] ;

		store.getAt(0).records().each( function( item ){
			param.records[0].records.push( item.data );

		});

		// submit할 form가져오기
		var uploadForm = form.down('[name=uploadForm]');

		if(!uploadForm.isValid()) {
			Ext.Msg.alert(Const.NOTICE, '<span style="color:black">Upload</span>할 파일형식을 확인해 주십시오.<br/><span style="color:blue">['+ me.allowExtension.join(', ') +']</span>만 업로드 가능합니다.');
			return;
		}
		// 파라미터 삽입
		uploadForm.getForm().setValues({
			param : JSON.stringify(param)
		});

		// submit
		uploadForm.getForm().submit({
			waitMsg:me.waitMsg, // progressbar 띄우기
			success:function(form, action){
				Ext.Msg.alert( '', '업로드 성공 했습니다.' );
				me.close();
			},
			failure: function(form, action) {
				Ext.Msg.alert( '', '업로드 실패 했습니다.' );
				me.close();
			}
		});

    },


	 insertAction: function(){
		var me = this,
		master = me.down('grid'),
		masterstore = master.getStore()
		;

		masterstore.add(
			Ext.create( masterstore.model.modelName , {
			})
		);

		var count = masterstore.getCount() ; /* 수신자 수 */
		me.down('form').down('[name=select_count]').setText(count); //= count.toString() ; /* 수신자 수 입력 */


	 },

	deleteAction: function(config){
		var me = this,
			master = me.down('grid')
		;
		if(config){ /* 저장시 전화번호가 없는 내역 */
			master.getStore().remove(config);
		}

		var count = master.getStore().getCount() ; /* 수신자 수 */
		me.down('form').down('[name=select_count]').setText(count); //= count.toString() ; /* 수신자 수 입력 */


	}



});
