Ext.define('module.prod.order.workentry.view.WorkEntryLister4', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workentry-lister4'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.prod.order.workentry.store.WorkEntryLister4',
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
				{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, handler:me.insert  ,cls: 'button-style',itemId:'insert' } ,
				{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, handler:me.insert  ,cls: 'button-style',itemId:'modify' } ,
				{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style',itemId:'lister4' } , '-' ,
				{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, handler:me.deleteItem  ,cls: 'button-style' }
			]
		};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center',},
				items : [
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번')			, width : 60 , align : 'center' ,hidden : true
					},{ dataIndex: 'rank'			, text : Language.get('rank'			,'순번')			, width : 60 , align : 'center'
					},{ dataIndex: 'cvic_idcd'		, text : Language.get('cvic_code'		,'설비')			, width : 120 , align : 'center',hidden:true
					},{ dataIndex: 'cvic_code'		, text : Language.get('cvic_code'		,'설비코드')		, width : 120 , align : 'center'
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비명')			, width : 200
					},{ dataIndex: 'prep_time'		, text : Language.get('prep_time'		,'준비시간')		, width : 80 ,xtype:'numericcolumn'
					},{ dataIndex: 'work_time'		, text : Language.get('work_time'		,'가동시간')		, width : 80 ,xtype:'numericcolumn'
					},{ dataIndex: 'mold_idcd'		, text : Language.get('mold_idcd'		,'금형')			, width : 80 , hidden:true
					},{ dataIndex: 'mold_yorn'		, text : Language.get('mold_yorn'		,'금형여부')		, width : 80  ,xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
					},{ dataIndex: 'mold_code'		, text : Language.get('acpt_numb'		,'금형코드')		, width : 120 , align : 'center'
					},{ dataIndex: 'mold_name'		, text : Language.get('acpt_case_name'	,'금형명')			, width : 200
					},{ dataIndex: 'mold_htct'		, text : Language.get('mold_htct'		,'타수')			, width : 60 ,xtype:'numericcolumn'
					},{ dataIndex: 'cavity'			, text : Language.get('cavity'			,'CAVITY')		, width : 80 ,xtype:'numericcolumn'
					},{ dataIndex: 'qult_halt_time'	, text : Language.get('qult_halt_time'	,'품질정지')		, width : 80 ,xtype:'numericcolumn'
					},{ dataIndex: 'cvic_halt_time'	, text : Language.get('cvic_halt_time'	,'설비정지')		, width : 80 ,xtype:'numericcolumn'
					},{ dataIndex: 'mtrl_halt_time'	, text : Language.get('mtrl_halt_time'	,'자재정지')		, width : 80 ,xtype:'numericcolumn'
					},{ dataIndex: 'etcc_halt_time'	, text : Language.get('etcc_halt_time'	,'기타정지')		, width : 80 ,xtype:'numericcolumn'
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
					Ext.Msg.alert("알림", '수정하려는 설비를 선택해주세요' );
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
				selectItem	= '{ cvic_idcd= "", prep_time= "", work_time="", cvic_stat_dvcd="", mold_yorn="", mold_idcd="", mold_name="", mold_code="",'
							   +'mold_htct= "", updt_shot= "", cavity="", cvic_name="", cvic_code="" , qult_halt_time="", cvic_halt_time=""'
							   +'mtrl_halt_time="", etcc_halt_time="", remk_text=""}';
			}
			var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 80,
					labelStyle: 'text-align:right',
					width		: 280,
					labelSeparator : ''
				},
				items:[
					{	fieldLabel	: Language.get('cvic_name','생산설비'),			//temp
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'cvic_name',
						pair		: 'cvic_idcd',
						width		: 340,
						clearable	: true ,
						value		: selectItem.cvic_name,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-cvic-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('cvic_name'));
								pairField.setValue(records[0].get('cvic_idcd'));
							}
						}
					},{	name : 'cvic_idcd', xtype : 'textfield' , hidden : true ,value		: selectItem.cvic_idcd
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin: '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('prep_time','준비시간'),
								xtype		: 'numericfield',
								name		: 'prep_time',
								margin		: '0 0 0 0',
								width		: 150,
								value		: selectItem.prep_time,
							},{	xtype		: 'label',
								text		: '분',
								margin		: '5 0 0 1'
							},{	fieldLabel	: Language.get('work_time','가동시간'),
								xtype		: 'numericfield',
								name		: 'work_time',
								margin		: '0 0 0 15',
								width		: 150,
								value		: selectItem.work_time,
							},{	xtype		: 'label',
								text		: '분',
								margin		: '5 0 0 1'
							},
						]
					},{	fieldLabel	: Language.get('cvic_stat_dvcd','설비상태'),			//temp
						xtype		: 'lookupfield',
						name		: 'cvic_stat_dvcd',
						width		: 340,
						value		: selectItem.cvic_stat_dvcd,
						lookupValue	: resource.lookup('cvic_stat_dvcd'),
					},{	fieldLabel	: Language.get('mold_yorn','금형사용'),			//temp
						xtype		: 'lookupfield',
						name		: 'mold_yorn',
						width		: 340,
						value		: selectItem.mold_yorn,
						lookupValue	: resource.lookup('yorn'),
						listeners	: {
							render:function(){
								var	panel = this.up('form');
								if(this.getValue()!=null || this.getValue() != ''){
									panel.down('[name=mold_name]').focus();
								}
							},
							change:function(){
								var	panel = this.up('form');
								panel.down('[name=mold_name]').focus();
							}
						},
					},{	fieldLabel	: Language.get('acpt_case_name','금형명'),			//temp
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'mold_name',
						pair		: 'mold_idcd',
						clearable	: false ,
						width		: 340,
						value		: selectItem.mold_name,
						readOnly	: false,
						listeners	: {
							change:function(){
								var	panel = this.up('form'),
									yorn = panel.down('[name=mold_yorn]').getValue();
								if(yorn == '0'){
									this.readOnly = true;
									this.setValue('');
									panel.down('[name=mold_idcd]').setValue("");
								}else{
									this.readOnly = false;
								}
							},
							focus:function(){
								var	panel = this.up('form'),
									yorn = panel.down('[name=mold_yorn]').getValue();
								if(yorn == '0'){
									this.readOnly = true;
									this.setValue(' ');
									setTimeout(function(){
										panel.down('[name=mold_idcd]').setValue("");
									}, 100)
								}else{
									this.readOnly = false;
								}
							}
						},
						popup: {
							select : 'SINGLE',
							widget : 'lookup-mold-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('mold_name'));
								pairField.setValue(records[0].get('mold_idcd'));
								var panel = nameField.up('form');
								panel.down('[name=mold_code]').setValue(records[0].get('mold_code'));
								panel.down('[name=cavity]').setValue(records[0].get('cavity'));
							}
						}
					},{	name : 'mold_idcd', xtype : 'textfield' , hidden : true,value		: selectItem.mold_idcd,
					},{	name : 'mold_code', xtype : 'textfield' , hidden : true,value		: selectItem.mold_code,
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('mold_htct','금형타수'),
								xtype		: 'numericfield',
								name		: 'mold_htct',
								margin		: '0 0 0 0',
								width		: 165,
								value		: selectItem.mold_htct,
							},{	fieldLabel	: Language.get('updt_shot','수정타수'),
								xtype		: 'numericfield',
								name		: 'updt_shot',
								margin		: '0 0 0 25',
								width		: 150,
								value		: selectItem.updt_shot,
							},
						]
					},{	fieldLabel	: Language.get('cavity','CAVITY'),
						xtype		: 'numericfield',
						name		: 'cavity',
						margin		: '0 0 0 0',
						width		: 165,
						readOnly	: true,
						fieldCls	: 'readonlyfield',
//						fieldStyle	: 'text-align:center',
						value		: selectItem.cavity,
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', margin:'5 0 0 0', border: 0,
						items	: [
							{	xtype		: 'label',
								margin		: '0 0 0 104',
								width		: 60,
								fieldStyle	: 'text-align:center',
								text		: '품질'
							},{	xtype		: 'label',
								margin		: '0 0 0 5',
								width		: 55,
								fieldStyle	: 'text-align:center',
								text		: '설비'
							},{	xtype		: 'label',
								margin		: '0 0 0 10',
								width		: 55,
								fieldStyle	: 'text-align:center',
								text		: '자재'
							},{	xtype		: 'label',
								margin		: '0 0 0 10',
								width		: 55,
								fieldStyle	: 'text-align:center',
								text		: '기타'
							},
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', margin:'5 0 0 0', border: 0,
							items	: [
								{	fieldLabel	: Language.get('qult_halt_time','유실시간'),
									xtype		: 'numericfield',
									name		: 'qult_halt_time',
									margin		: '0 0 0 0',
									width		: 140,
									value		: selectItem.qult_halt_time,
								},{	xtype		: 'numericfield',
									name		: 'cvic_halt_time',
									margin		: '0 0 0 11',
									width		: 55,
									value		: selectItem.cvic_halt_time,
								},{	xtype		: 'numericfield',
									name		: 'mtrl_halt_time',
									margin		: '0 0 0 12',
									width		: 55,
									value		: selectItem.mtrl_halt_time,
								},{	xtype		: 'numericfield',
									name		: 'etcc_halt_time',
									margin		: '0 0 5 11',
									width		: 55,
									value		: selectItem.etcc_halt_time,
								},
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
								cvic_idcd		: param.cvic_idcd		,
								prep_time		: param.prep_time	,
								work_time		: param.work_time		,
								cvic_stat_dvcd	: param.cvic_stat_dvcd		,
								mold_yorn		: param.mold_yorn		,
								mold_idcd		: param.mold_idcd		,
								mold_htct		: param.mold_htct		,
								updt_shot		: param.updt_shot		,
								cavity			: param.cavity		,
								qult_halt_time	: param.qult_halt_time		,
								cvic_halt_time	: param.cvic_halt_time		,
								mtrl_halt_time	: param.mtrl_halt_time		,
								etcc_halt_time	: param.etcc_halt_time		,
								remk_text		: param.remk_text		,
								line_seqn		: line_seqn				,
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
			win =	Ext.widget('window', {
					title: '설비가동 입력',
					closeAction: 'hide',
					width: 400,
					height: 380,
					minWidth: 300,
					minHeight: 350,
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