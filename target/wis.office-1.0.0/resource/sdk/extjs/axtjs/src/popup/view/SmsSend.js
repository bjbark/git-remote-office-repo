
Ext.define('Axt.popup.view.SmsSend', { extend: 'Axt.popup.Search',

	 alias   : 'widget.popup-sms-send',
	 id      : 'popup-sms-send',
	 requires:
	 [
	 	'Axt.form.Layout',
	 	'Axt.form.Search',
	 	'Axt.grid.Panel',
	 	'Axt.tab.Panel'
	 ],
	 title   : 'SMS 전송',
	 closable: true,
	 autoShow: true,
     width   : 700,
	 height  : 500,
	 layout  : {
        type : 'border'
     },

	 defaultFocus : 'initfocused',

     initComponent: function(config){
        var me = this;
	        me.items = [me.createForm()];
        	me.callParent(arguments);

        	url = me.params.url ;

        	me.down('form').loadRecord(me.values.record); /* form 에 record 입력 */
        	me.down('grid').reconfigure( me.values.record.records() ); /* 그리드 재설정 */

        	/* 팝업 form 각 항목에 데이터 입력 */
        	me.down('form').down('[name=select_count]').setText( me.values.record.records().getCount() || '0' ); /* 그리드 record 합계 입력 */

    },
	  createForm: function(){
	 	var  me   = this,
	 		 form = {
	 			 xtype         : 'form',
	 			 bodyStyle     : { padding: '0', background: 'transparent' },
	 			 width         : 690,
	 			 height        : 468,
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
	 			 					 	text 	: '내용',
	 			 					},
	 		 		 	 			{   xtype   : 'label',
	 			 						margin  : '0 0 0 160',
	 			 						name    : 'mms',
	 			 						minWidth : 20,
	 			 						maxWidth : 20,
	 		 			 				text 	: 'SMS',
	 		 			 			},
	 		 	 					{   xtype   : 'label',
	 			 						name    : 'byte',
	 		 			 				margin  : '0 0 0 10',
	 			 						minWidth : 25,
	 			 						maxWidth : 25,
	 			 					 	text 	: '0',
	 			 					},
	 		 	 					{   xtype   : 'label',
	 		 			 				margin  : '0 0 0 0',
	 		 			 				width   : 5,
	 			 					 	text 	: '/',
	 			 					},
	 		 	 					{   xtype   : 'label',
	 			 						margin  : '0 0 0 5',
	 			 						name    : '80',
	 			 						minWidth : 30,
	 			 						maxWidth : 30,
	 			 					 	text 	: '80',
	 			 					} ,
	 		 	 					{   xtype   : 'label',
	 			 						margin  : '0 0 0 5',
	 			 						minWidth : 35,
	 			 						maxWidth : 35,
	 			 					 	text 	: 'Byte',
	 			 					}
	 		 		 			]
	 		 		 	    },
		 		 		    {
		 		 		    	name       : 'content' ,
		 		 		    	xtype      : 'textarea',
		 		 		    	fieldCls   : 'salecheck-form',
		 		 		    	allowBlank : false,
		 		 		    	width      : 310 ,
		 		 		    	height     : 300 ,
		 			     		listeners  : {
		 			     			change:{
		 			     				fn:function(field, oldValue, newValue,eOpts){
		 			     					var me = this,
		 			     						no = oldValue, /* 현재값 */
		 			     						bytes = undefined
		 			     					;
		 			     					bytes = Axt.util.CommonUtils.getByteLength(no); /* 입력 내용을 Byte 체크 함수에 적용 */

		 			     					if( bytes <= 80 ) {
		 			     						me.up('form').down('[name=mms]').setText( "SMS" );
		 			     						me.up('form').down('[name=byte]').setText( bytes);
		 			     						me.up('form').down('[name=80]').setText( "80" );
		 			     					} else
		 			     					if( bytes > 80 && bytes <= 4000 ) {
		 			     						me.up('form').down('[name=mms]').setText( "MMS" );
		 			     						me.up('form').down('[name=byte]').setText( bytes );
		 			     						me.up('form').down('[name=80]').setText( "4,000" );
		 			     					} else {
		 										Ext.Msg.show({ title: '알림', msg: "용량을 초과하였습니다. <br/>  4,000 Byte까지 입력 가능합니다."
		 											, icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me,
		 											fn : function (button) {
		 												me.setValue( newValue ); /* 이전 값으로 복원 */
		 												return;
		 											}
		 										});

		 			     					}
		 			     				}
		 			     			}
		 			     		}
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
		 		 		    	hidden     : true
		 		 		    },
		 		 		    {   xtype      : 'textfield',
		 		 		    	name       : 'schedule',
		 		 		    	hidden     : true
		 		 		    },
		 		 		    {   xtype      : 'textfield',
		 		 		    	name       : 'attribute',
		 		 		    	hidden     : true
		 		 		    },
		 		 		    {   xtype      : 'textfield',
		 		 		    	name       : 'smsdb_id',
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
	 		 				{   xtype     	: me.createGrid(),
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
		        		 {   dataIndex: 'address'		, width: 124, text: Language.get('',   	'전화번호' ) , tdCls : 'editingcolumn',
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

    	var no = record.get('content');
	   	bytes = Axt.util.CommonUtils.getByteLength(no);

	   	if( bytes == 0 ){  /* 내용 입력 여부 체크 */
			Ext.Msg.show({ title: '알림', msg: "내용을 입력해 주시기 바랍니다."
				, icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me
			});
			return;
	   	} else if ( bytes <= 80 ) { /* 내용이 80byte 미만일 경우 */

	   	} else if ( bytes > 80 && bytes <= 4000 ){ /* 내용이 4000 byte 미만일 경우 */
	   		record.set('attribute', '1' ); /* MMS로 설정 */
	   	} else { /* 4000 byte 이상일 경우 */
			Ext.Msg.show({ title: '알림', msg: "용량을 초과하였습니다. <br/>  4,000 Byte까지 입력 가능합니다."
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

				var rgEx = /[01](0|1|6|7|8|9)[-](\d{4}|\d{3})[-]\d{4}$/g ;
				var rgEx1 = /[01](0|1|6|7|8|9)(\d{4}|\d{3})\d{4}$/g ;
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

			Ext.Msg.show({ title: '알림', msg: "전화번호를 입력해 주시기 바랍니다."
						, icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me
			});
			return;
	   	}


        var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
        mask.show();

 		store.sync({
				success : function(operation){  }, // 저장 성공시
				failure : function(operation){  }, // 저장 실패시 호출
				callback: function(operation){ }   // mask.hide();
		});

    	mask.hide();
    	me.close();

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
