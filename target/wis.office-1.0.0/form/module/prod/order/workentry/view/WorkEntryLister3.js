Ext.define('module.prod.order.workentry.view.WorkEntryLister3', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workentry-lister3'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.prod.order.workentry.store.WorkEntryLister3',
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, handler: me.insert ,cls: 'button-style',itemId:'insert' } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, handler: me.insert ,cls: 'button-style',itemId:'modify' } ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style',itemId:'lister3' } , '-' ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, handler: me.deleteItem ,cls: 'button-style' }
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번')			, width : 60 , align : 'center' ,hidden : true
					},{ dataIndex: 'rank'			, text : Language.get('rank'			,'순번')			, width : 60 , align : 'center'
					},{ dataIndex: 'wkct_idcd'		, text : Language.get('wkct_idcd'		,'공정ID')		, width : 120 , align : 'center',hidden:true
					},{ dataIndex: 'wkct_code'		, text : Language.get('wkct_code'		,'공정코드')		, width : 100 , align : 'center'
					},{ dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'공정명')			, width : 160
					},{ dataIndex: 'loss_resn_dvcd'	, text : Language.get('loss_resn_dvcd'	,'유실항목명')		, width : 160 , xtype : 'lookupcolumn', lookupValue : resource.lookup('loss_resn_dvcd'), align : 'center'
					},{ dataIndex: 'sttm'			, text : Language.get('sttm'			,'시작시간')		, width : 100  , align : 'center',
					},{ dataIndex: 'edtm'			, text : Language.get('edtm'			,'종료시간')		, width : 100 , align : 'center'
					},{ dataIndex: 'loss_time'		, text : Language.get('loss_time'		,'소요시간(분)')	, width : 85 , xtype:'numericcolumn'
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고')			, width : 200
					}
				]
			}
		;
		return item;
	},
	insert : function () {
		var	store = this.up('grid').getStore(),
			tempa = this.up('grid'),
			milestone = this.itemId,
			selectItem,
			sItemLength,
			line_seqn,
			invc_numb,
			_set
		;
		if(store.queryparam == null || store.queryparam == ""){
			Ext.Msg.alert("알림", '생산실적을 선택해주세요' );
			return;
		}else{
			invc_numb 	= store.queryparam.invc_numb;
			if(milestone == 'modify'){
				if(tempa.getSelectionModel().selected.items.length > 0){
					selectItem = tempa.getSelectionModel().selected.items[0].data;
					line_seqn = selectItem.line_seqn;
					_set	  = 'update';
				}else{
					Ext.Msg.alert("알림", '수정하려는 유실공수를 선택해주세요' );
					return;
				}
			}else{
				_set		= 'insert';
				if(tempa.getStore().data.length >0){
					sItemLength = tempa.getStore().data.length-1;
					line_seqn 	= tempa.getStore().data.items[sItemLength].data.line_seqn+1;
				}else{
					line_seqn 	= 0;
				}
				selectItem	= '{ wkct_idcd : "",wkct_name:"",drtr_idcd:"",user_name="",loss_resn_dvcd="",work_sttm="",work_edtm="",need_time="",remk_text=""}';
			}
			var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 80,
					labelStyle: 'text-align:right',
					width		: 280,
				},
				items:[
					{	fieldLabel	: Language.get('wkct_name','작업공정'),			//temp
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wkct_name',
						pair		: 'wkct_idcd',
						width		: 340,
						clearable	: true ,
						value		: selectItem.wkct_name,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-wkct-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('wkct_name'));
								pairField.setValue(records[0].get('wkct_idcd'));
							}
						}
					},{	name : 'wkct_idcd', xtype : 'textfield' , hidden : true ,value		: selectItem.wkct_idcd
					},{	fieldLabel	: Language.get('drtr_name','담당자'),			//temp
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'user_name',
						pair		: 'drtr_idcd',
						clearable	: false ,
						width		: 340,
						value		: selectItem.user_name,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-user-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0'},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('user_name'));
								pairField.setValue(records[0].get('user_idcd'));
							}
						}
					},{	name : 'drtr_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('loss_resn_dvcd','유실항목'),			//temp
						xtype		: 'lookupfield',
						name		: 'loss_resn_dvcd',
						width		: 340,
						value		: selectItem.loss_resn_dvcd,
						lookupValue	: resource.lookup('loss_resn_dvcd'),
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,
						items	: [
							{	fieldLabel	: Language.get('sttm','유실시간'),
								xtype		: 'textfield',
								name		: 'sttm',
								format: 'H:i',
								increment: 30,
								anchor: '100%',
								width		: 140,
								fieldStyle	: 'text-align:center',
								value		: selectItem.sttm,
								listeners	: {
									change:function(is){
										var value = is.value;
										var panel = this.up('form');
										if(value.length>5){
											var temp = value.substr(0,5);
											this.setValue(temp);
											panel.down('[name=edtm]').focus();
										}else{
											var t = value.substr(0,2);
											var m = value.substr(3,2);
											if(value.length==2){
												if(isNaN(Number(t))){
													this.setValue();
												}else{
													if(t <24 && t>=0){
														this.setValue(t+':');
													}else{
														this.setValue();
													}
												}
											}
											if(value.length==5){
												if(isNaN(Number(m))){
													this.setValue();
												}
												if(m>59||m<0){
													this.setValue(t+':');
												}
											}
										}
									}
								}
							},{	xtype		:'label',
								text		:'~',
								margin: '5 5 0 10'
							},{ xtype		: 'textfield',
								name		: 'edtm',
								margin		: '0 0 0 5',
								width		: 55,
								fieldStyle	: 'text-align:center',
								value		: selectItem.edtm,
								listeners	: {
									change:function(is){
										var value = is.value;
										var panel = this.up('form');
										if(value.length>=5){
											var temp = value.substr(0,5);
											this.setValue(temp);
											panel.down('[name=loss_time]').focus();
										}else{
											var t = value.substr(0,2);
											var m = value.substr(3,2);
											if(value.length==2){
												if(isNaN(Number(t))){
													this.setValue();
												}else{
													if(t <24 && t>=0){
														this.setValue(t+':');
													}else{
														this.setValue();
													}
												}
											}
											if(value.length==5){
												if(isNaN(Number(m))){
													this.setValue();
												}
												if(m>59||m<0){
													this.setValue(t+':');
												}
											}
										}
									}
								}
							},{ xtype		: 'numericfield',
								name		: 'loss_time',
								margin		: '0 0 0 48',
								width		: 55,
								fieldStyle	: 'text-align:center',
								value		: selectItem.loss_time,
								readOnly	: true,
								listeners	: {
									focus : function(){
										var panel	= this.up('form'),
										sttm	= panel.down('[name=sttm]').getValue(),
										edtm	= panel.down('[name=edtm]').getValue();
										if(sttm != null && sttm != '' && edtm != null && edtm != ''){
											var sttmStr = sttm.split(':'),
											 	edtmStr = edtm.split(':'),
											 	h, m;
											if(sttmStr[0]>edtmStr[0]){
												h = ((Number(edtmStr[0])+24)-sttmStr[0])*60;
											}else{
												h=(edtmStr[0]-sttmStr[0])*60
											}
											if(sttmStr[1]>edtmStr[1]){
												m=(Number(edtmStr[1])+60)-sttmStr[1];
												if(h==0){
													h = 23*60;
												}else{
													h = h-60;
												}
											}else{
												m=edtmStr[1]-sttmStr[1];
											}
											this.setValue(h+m);
										}
									}
								}
							},{	xtype		: 'label',
								text		: '분',
								margin: '5 0 0 1'
							}
						]
					},{	fieldLabel	: Language.get('remk_text','비고'),
						xtype		: 'textarea',
						name		: 'remk_text',
						width		: 340,
						value		: selectItem.remk_text,
					},
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:1em">저장</span>',
						cls: 'button-style',
						handler: function() {
							var param = Ext.merge( this.up('form').getValues() );
							record = Ext.create( store.model.modelName , {
								wkct_idcd		: param.wkct_idcd		,
								loss_resn_dvcd	: param.loss_resn_dvcd	,
								sttm			: param.sttm		,
								edtm			: param.edtm		,
								loss_time		: param.loss_time		,
								remk_text		: param.remk_text		,
								line_seqn		: line_seqn				,
								drtr_idcd		: param.drtr_idcd,
								invc_numb		: invc_numb
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store.reload();
									this.up('form').getForm().reset();
									this.up('window').hide();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : _set} );
					    }
					},
					{	text: '<span class="btnTemp" style="font-size:1em">취소</span>',
						cls: 'button-style',
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				]
			});
			win = Ext.widget('window', {
				title: '유실공수 입력',
				closeAction: 'hide',
				width: 400,
				height: 280,
				minWidth: 300,
				minHeight: 280,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: 'firstname'
			});
			win.show();
		}
	},
	deleteItem : function() {
		var	tempa = this.up('grid'),
			store = this.up('grid').getStore(),
			selectItem = tempa.getSelectionModel().selected.items[0].data,
			line_seqn = selectItem.line_seqn,
			invc_numb = selectItem.invc_numb,
			_set = 'delete'
		;
		Ext.Msg.confirm("알림","삭제하시겠습니까?",function(button){
			if(button=='yes'){
				record = Ext.create( store.model.modelName , {
					invc_numb: invc_numb,
					line_seqn: line_seqn,
				});
				store.add(record);
				store.sync({
					callback: function(batch, options) {
						store.reload();
					} ,
					scope: this
				},{	synchro : _global.objects.synchro,_set : _set} );
			}
		});
	}
});