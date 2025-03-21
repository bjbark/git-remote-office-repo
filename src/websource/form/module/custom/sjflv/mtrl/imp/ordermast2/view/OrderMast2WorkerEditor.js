	Ext.define('module.custom.sjflv.mtrl.imp.ordermast2.view.OrderMast2WorkerEditor', { extend: 'Axt.form.Editor',

		alias	: 'widget.module-ordermast2-worker-editor',
		height	:  /*_global.hq_id.toUpperCase() == 'N1000SJUNG'? 350 : 285,*/330,
		header	: false,
		getStore: function() {
			return Ext.getStore( 'module.custom.sjflv.mtrl.imp.ordermast2.store.OrderMast2Invoice' );
		},
		initComponent: function(config){
			var me = this;
			me.dockedItems = [ me.createWest() ] ;
//			me.items = me.createTabs();
			me.callParent(arguments);
		},
	/**
	 *
	 */
	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			region		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			flex		: 1,
			fieldDefaults: { width : 300, labelWidth : 70 , margin : '5 5 5 0'},
			items		: [
				{	xtype : 'fieldset', layout: 'hbox',
					items : [
						{	xtype : 'fieldset', layout: 'vbox', border : 0,  margin : '0 0 3 0',
							items : [
								{	xtype : 'fieldset', layout: 'hbox', border : 0,
									items : [
										{	fieldLabel	: Language.get('invc_numb','Order No'),
											name		: 'invc_numb',
											xtype		: 'textfield',
											allowBlank	: false,
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue,
											width		: 240,
											enableKeyEvents : true,
											listeners	: {
												keydown : function(self, e) {
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=line_stat]').focus(true , 10)
													}
												}
											}
										},{	name		: 'amnd_degr', xtype : 'textfield' , hidden : true
										},{	xtype		: 'lookupfield',
											name		: 'line_stat',
											width		: 55,
											editable	: false,
											margin		: '6 0 0 0',
											lookupValue	: resource.lookup('line_stat'),
											enableKeyEvents : true,
											listeners	: {
												keydown : function(self, e) {
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=mngt_numb]').focus(true , 10)
													}
													this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
														scope: this,
														key: Ext.EventObject.TAB,
														shift:true,
														fn: function () {
															me.down('[name=invc_numb]').focus(true , 10)
														}
													});
												}
											}
										},{	fieldLabel	: Language.get('ordr_date','Order Date'),
											xtype		: 'datefield',
											name		: 'invc_date',
											width		: 240,
											labelWidth	: 95,
											root		: true,
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											allowBlank	: false,
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue,
											value		: '',
											clearable	: true,
											enableKeyEvents : true,
											listeners	: {
												keydown : function(self, e) {
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=vldt]').focus(true , 10)
													}
													this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
														scope: this,
														key: Ext.EventObject.TAB,
														shift:true,
														fn: function () {
															me.down('[name=mngt_numb]').focus(true , 10)
														}
													});
												}
											}
										},{	fieldLabel	: Language.get('drtr_name','담당자'),
											xtype		: 'popupfield',
											editable	: true,
											name		: 'drtr_name',
											pair		: 'drtr_idcd',
											clearable	: true ,
											width		: 240,
											labelWidth	: 100,
											margin		: '4 0 0 20',
											enableKeyEvents : true,
											popup		: {
												select	: 'SINGLE',
												widget	: 'lookup-user-popup',
												params	: { stor_grp : _global.stor_grp , line_stat : '0' },
												result	: function(records, nameField, pairField) {
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
													setTimeout(function(){
														me.down('[name=pric_cond_dvcd]').focus(true,10);
													}, 50)
												}
											}
										},{	name		: 'drtr_idcd', xtype : 'textfield' , hidden : true
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '-10 0 0 0',
									items : [
										{	fieldLabel	: Language.get('bzpl', '사업장' ),
											name		: 'bzpl_name',
											pair		: 'bzpl_idcd',
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											clearable	: true ,
											width		: 300,
											popup		: {
												widget	: 'lookup-bzpl-popup',
												select	: 'SINGLE',
												params	: { stor_grp : _global.stor_grp, line_stat : '0' },
												result	: function(records, nameField, pairField ) {
													nameField.setValue(records[0].get('bzpl_name'));
													pairField.setValue(records[0].get('bzpl_idcd'));
													setTimeout(function(){
														me.down('[name=incm_dvcd]').focus(true,10);
													}, 50)
												}
											}
										},{	name	: 'bzpl_idcd', xtype	: 'textfield', hidden : true
										},{	fieldLabel	: Language.get('incm_dvcd','수입구분'),
											xtype		: 'lookupfield',
											name		: 'incm_dvcd',
											width		: 180,
											margin		: '6 0 0 20',
											lookupValue	: resource.lookup('incm_dvcd'),
											allowBlank	: false,
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue,
											fieldCls	: 'requiredindex',
											enableKeyEvents : true,
											listeners	: {
												keydown : function(self, e) {
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=buyr_name]').focus(true , 10)
													}
													this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
														scope: this,
														key: Ext.EventObject.TAB,
														shift:true,
														fn: function () {
															me.down('[name=bzpl_name]').focus(true , 10)
														}
													});
												}
											}
										},{	fieldLabel	: Language.get('','요청고객'),
											xtype		: 'popupfield',
											editable	: true,
											name		: 'reqt_cstm_name',
											pair		: 'reqt_cstm_idcd',
											clearable	: true ,
											width		: 240,
											labelWidth	: 100,
											hidden		: _global.hq_id.toUpperCase()!='N1000SJUNG' ? true : false ,
											margin		: '4 0 0 60',
											enableKeyEvents : true,
											popup		: {
												widget	: 'lookup-cstm-popup',
												select	: 'SINGLE',
												params	: { stor_grp : _global.stor_grp, line_stat : '0',sale_cstm_yorn:1 },
												result	: function(records, nameField, pairField ) {
													nameField.setValue(records[0].get('cstm_name'));
													pairField.setValue(records[0].get('cstm_idcd'));
													setTimeout(function(){
														me.down('[name=mdtn_name]').focus(true,10);
													}, 50)
												}
											}
										},{	name		: 'reqt_cstm_idcd', xtype : 'textfield' , hidden : true
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '-2 0 0 0',
									items : [
										{	fieldLabel	: Language.get('', 'Supplier' ),
											name		: 'buyr',
											pair		: 'cstm_idcd',
											xtype		: 'popupfield',
											width		: 300,
											enableKeyEvents : true,
											allowBlank	: false,
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue,
											editable	: false,
											clearable	: true ,
											popup		: {
												widget	: 'lookup-cstm-popup',
												select	: 'SINGLE',
												params	: { stor_grp : _global.stor_grp, line_stat : '0',puch_cstm_yorn:1 },
												result	: function(records, nameField, pairField ) {
													nameField.setValue(records[0].get('cstm_name'));
													pairField.setValue(records[0].get('cstm_idcd'));
													setTimeout(function(){
														me.down('[name=mdtn_name]').focus(true,10);
													}, 50)
												}
											}
										},{	name	: 'cstm_idcd', xtype	: 'textfield', hidden : true,
											listeners:{
												change:function(){
													me.down('[name=mdtn_name]').popup.params = { stor_grp : _global.stor_grp , line_stat : '0' ,cstm_idcd:this.getValue() };

													var searchForm = Ext.ComponentQuery.query('module-ordermast2-worker-search')[0];
													searchForm.down('[name=item_code]').popup.params.cstm_idcd = this.getValue();
												}
											}
										},{	fieldLabel	: Language.get('','Forwarder'),
											xtype		: 'popupfield',
											name		: 'mdtn_name',
											pair		: 'mdtn_prsn',
											width		: 240,
											margin		: '6 0 0 20',
											enableKeyEvents : true,
											clearable	: true,
											popup		: {
												widget	: 'lookup-cstm-deli-popup',
												select	: 'SINGLE',
												params	: { stor_grp : _global.stor_grp, line_stat : '0' },
												result	: function(records, nameField, pairField ) {
													nameField.setValue(records[0].get('dely_cstm_name'));
													pairField.setValue(records[0].get('dlvy_cstm_idcd'));
													setTimeout(function(){
														me.down('[name=drtr_name]').focus(true,10);
													}, 50)
												},
												alias	: 'widget.module-ordermast2-worker-editor',
												create : function (self ) {
													editor = Ext.ComponentQuery.query('module-ordermast2-worker-editor')[0];
													param = editor.getValues()
													if(param.cstm_idcd== '' || param.cstm_idcd == null ){
														Ext.Msg.alert("알림","Supplier를 먼저 선택하여 주십시오.");
														popup.close();
														return;
													}
												}
											},
										},{	name	: 'mdtn_prsn', xtype	: 'textfield', hidden : true
										},{	fieldLabel	: Language.get('trde_trnt_dvcd','운송수단'),
											xtype		: 'lookupfield',
											name		: 'trde_trnt_dvcd',
											width		: 240,
											labelWidth	: 100,
											lookupValue	: resource.lookup('trde_trnt_dvcd'),
											enableKeyEvents : true,
											listeners	: {
												keydown : function(self, e) {
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=mney_unit]').focus(true , 10)
													}
													this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
														scope: this,
														key: Ext.EventObject.TAB,
														shift:true,
														fn: function () {
															me.down('[name=ogin_name]').focus(true , 10)
														}
													});
												}
											}
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '-2 0 0 0',
									items : [
										{	fieldLabel	: Language.get('pric_cond_dvcd','단가조건'),
											xtype		: 'lookupfield',
											name		: 'pric_cond_dvcd',
											width		: 200,
											lookupValue	: resource.lookup('pric_cond_dvcd'),
											enableKeyEvents : true,
											listeners	: {
												keydown : function(self, e) {
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=trde_stot_dvcd]').focus(true , 10)
													}
													this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
														scope: this,
														key: Ext.EventObject.TAB,
														shift:true,
														fn: function () {
															me.down('[name=drtr_name]').focus(true , 10)
														}
													});
												}
											}
										},{	fieldLabel	: Language.get('trde_stot_dvcd','결제방법'),
											xtype		: 'lookupfield',
											name		: 'trde_stot_dvcd',
											labelWidth	: 140,
											width		: 250,
											margin		: '6 0 0 50',
											lookupValue	: resource.lookup('trde_stot_dvcd'),
											enableKeyEvents : true,
											listeners	: {
												keydown : function(self, e) {
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=stot_time_dvcd]').focus(true , 10)
													}
													this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
														scope: this,
														key: Ext.EventObject.TAB,
														shift:true,
														fn: function () {
															me.down('[name=pric_cond_dvcd]').focus(true , 10)
														}
													});
												}
											}
										},{	fieldLabel	: Language.get('stot_time_dvcd','결제시기'),
											xtype		: 'lookupfield',
											name		: 'stot_time_dvcd',
											width		: 300,
											labelWidth	: 160,
											margin		: '6 0 0 0',
											lookupValue	: resource.lookup('stot_time_dvcd'),
											enableKeyEvents : true,
											listeners	: {
												keydown : function(self, e) {
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=stot_ddln]').focus(true , 10)
													}
													this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
														scope: this,
														key: Ext.EventObject.TAB,
														shift:true,
														fn: function () {
															me.down('[name=trde_stot_dvcd]').focus(true , 10)
														}
													});
												}
											}
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '-2 0 0 0',
									items : [
										{	fieldLabel	: Language.get('ship_port','Shipping Port'),
											xtype		: 'textfield',
											name		: 'ship_port',
											width		: 260,
											enableKeyEvents : true,
											listeners	: {
												keydown : function(self, e) {
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=etdd]').focus(true , 10)
													}
													this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
														scope: this,
														key: Ext.EventObject.TAB,
														shift:true,
														fn: function () {
															me.down('[name=stot_ddln]').focus(true , 10)
														}
													});
												}
											}
										},{	fieldLabel	: Language.get('dsch_port','Discharging Port'),
											xtype		: 'textfield',
											name		: 'dsch_port',
											width		: 300,
											labelWidth	: 130,
											margin		: '6 0 0 0',
											enableKeyEvents : true,
											listeners	: {
												keydown : function(self, e) {
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=etaa]').focus(true , 10)
													}
													this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
														scope: this,
														key: Ext.EventObject.TAB,
														shift:true,
														fn: function () {
															me.down('[name=etdd]').focus(true , 10)
														}
													});
												}
											}
										},{	fieldLabel	: Language.get('','Destination'),
											xtype		: 'textfield',
											name		: 'arvl_port',
											width		: 240,
											labelWidth	: 100,
											enableKeyEvents : true,
											listeners	: {
												keydown : function(self, e) {
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=pckg_size]').focus(true , 10)
													}
													this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
														scope: this,
														key: Ext.EventObject.TAB,
														shift:true,
														fn: function () {
															me.down('[name=etaa]').focus(true , 10)
														}
													});
												}
											}
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '-2 0 0 0',
									items : [
										{	fieldLabel	: Language.get('ogin_name','Origin'),
											xtype		: 'textfield',
											name		: 'ogin_name',
											width		: 260,
											margin		: '6 0 0 0',
											enableKeyEvents : true,
											listeners	: {
												keydown : function(self, e) {
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=trde_trnt_dvcd]').focus(true , 10)
													}
													this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
														scope: this,
														key: Ext.EventObject.TAB,
														shift:true,
														fn: function () {
															me.down('[name=pckg_size]').focus(true , 10)
														}
													});
												}
											}
										},{	fieldLabel	: Language.get('','Packing'),
											xtype		: 'textfield',
											name		: 'pckg_unit',
											width		: 300,
											labelWidth	: 130,
											margin		: '4 0 0 5',
											enableKeyEvents : true,
											listeners	: {
												keydown : function(self, e) {
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=ogin_name]').focus(true , 10)
													}
													this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
														scope: this,
														key: Ext.EventObject.TAB,
														shift:true,
														fn: function () {
															me.down('[name=arvl_port]').focus(true , 10)
														}
													});
												}
											}
										},{	fieldLabel	: Language.get('vldt','Validity'),
											xtype		: 'datefield',
											name		: 'vldt',
											width		: 180,
											labelWidth	: 80,
											root		: true,
											margin		: '4 0 0 20',
											format		: Const.DATE_FORMAT_YMD_BAR,
											submitFormat: Const.DATE_FORMAT_YMD,
											clearable	: true,
											listeners	: {
												keydown : function(self, e) {
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=bzpl_name]').focus(true , 10)
													}
													this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
														scope: this,
														key: Ext.EventObject.TAB,
														shift:true,
														fn: function () {
															me.down('[name=ordr_date]').focus(true , 10)
														}
													});
												}
											}
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '-2 0 0 0',
									items : [
										{	fieldLabel	: Language.get('','화폐단위'),
											xtype		: 'lookupfield',
											enableKeyEvents : true,
											name		: 'mney_unit',
											width		: 200,
											margin		: '10 0 0 0',
											lookupValue	: resource.lookup('crny_dvcd'),
											listeners	: {
												keydown : function(self, e) {
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=exrt]').focus(true , 10)
													}
													this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
														scope: this,
														key: Ext.EventObject.TAB,
														shift:true,
														fn: function () {
															me.down('[name=trde_trnt_dvcd]').focus(true , 10)
														}
													});
												}
											}
										},{	fieldLabel	: Language.get('exrt','적용환율'),
											xtype		: 'numericfield',
											name		: 'exrt',
											labelWidth	: 140,
											width		: 250,
											margin		: '6 0 0 55',
											enableKeyEvents : true,
											listeners	: {
												keydown : function(self, e) {
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=user_memo]').focus(true , 10)
													}
													this.keyMap = Ext.create('Ext.util.KeyMap', this.el, {
														scope: this,
														key: Ext.EventObject.TAB,
														shift:true,
														fn: function () {
															me.down('[name=mney_unit]').focus(true , 10)
														}
													});
												}
											}
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '-2 0 0 0',
									items : [
										{	fieldLabel	: Language.get('', 'Remarks' ),
											name		: 'user_memo',
											xtype		: 'textarea',
											margin		: '10 0 0 0',
											width		: 1000,
											height		: 45,
										}
									]
								},{	xtype : 'fieldset', layout: 'hbox', border : 0,  margin : '-2 0 0 0',
									items : [
										{	fieldLabel	: Language.get('', '선적메모' ),
											name		: 'ship_memo',
											xtype		: 'textfield',
											margin		: '10 0 10 0',
											width		: 445,
											listeners	: {
												keydown : function(self, e) {
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=trns_exps]').focus(true , 10)
													}
												}
											}
										},{	fieldLabel	: Language.get('trns_exps','운송비'),
											xtype		: 'textfield',
											name		: 'trns_exps',
											margin		: '10 0 0 0',
											allowBlank	: true,
											width		: 180,
											labelWidth	: 80,
											format		: '#,##0.##',
											listeners	: {
												keydown : function(self, e) {
													debugger;
													if ( e.keyCode == e.ENTER||e.keyCode == e.TAB ) {
														me.down('[name=insu_amnt]').focus(true , 10)
													}
												}
											},
											validator: function(v) { // validator속성이 키입력시 발생
												var n = (String(v).replace(/[^\d.]/g, ""));
												if (n.indexOf('.') > 0) {
												        n = Number(String(n.split('.')[0]).replace(/[^\d]/g, ""))
												            + "." +
												            String(n.split('.')[1].replace(/[^\d]/g, "")).toLocaleString().slice(0, 2);
												}
												this.setValue(n);
												return true;
											},
											hidden 		:_global.hq_id.toUpperCase() == 'N1000SJFLV' ? false : true ,
										},{	fieldLabel	: Language.get('insu_amnt','보험비'),
											xtype		: 'textfield',
											name		: 'insu_amnt',
											margin		: '10 0 0 0',
											allowBlank	: true,
											width		: 180,
											labelWidth	: 80,
											validator: function(v) { // validator속성이 키입력시 발생
												if(!/[^\d.]/g.test(v)){
													v = v.replace(/[^\d.]/g,'');
												}
												this.setValue(Number(v));
												return true;
											},
											validator: function(v) { // validator속성이 키입력시 발생
												var n = (String(v).replace(/[^\d.]/g, ""));
												if (n.indexOf('.') > 0) {
												        n = Number(String(n.split('.')[0]).replace(/[^\d]/g, ""))
												            + "." +
												            String(n.split('.')[1].replace(/[^\d]/g, "")).toLocaleString().slice(0, 2);
												}
												this.setValue(n);
												return true;
											},
											format		: '#,##0.##',
											hidden 		:_global.hq_id.toUpperCase() == 'N1000SJFLV' ? false : true ,
										},{	fieldLabel	: Language.get('change','change'),
											xtype		: 'textfield',
											name		: 'change',
											hidden		: true
										}
									]
								}
							]
						}
					]
				}
			]
		};
		return item;
	},
	createTabs : function () {
		var me = this,
			tabs = {
				xtype	: 'panel',
				region	: 'center',
				header	: false,
				plain	: true,
				margin	: 0 ,
				items	: [ me.createWest() ]
			}
		;
		return tabs;
	},
});
