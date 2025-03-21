Ext.define('module.qc.basic.insptypeitem.view.InspTypeItemWorkerSearch', { extend: 'Axt.form.Search',
	store	: 'module.qc.basic.insptypeitem.store.InspTypeItemInvoice',
	alias	: 'widget.module-insptypeitem-worker-search',
	style	: 'padding-top : 1px;' ,

	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.items = [me.createLine1()/*, me.createLine2() */];
		me.callParent();
	},

	/**
	 * 라인1
	 */
	createLine1 : function(){
		var me   = this,
			line = {
				xtype  : 'fieldset' ,
				margin : '0 0 0 0' ,
				items  : [
					{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 190,
						items	: [
							{	text		: '검사항목명', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'insp_sbsc_name',
								margin		: '2 2 2 2',
								itemId		: 'initfocused' ,
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=insp_cond]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}

							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 300 ,
						items	: [
							{	text		: '검사조건', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'insp_cond',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=msmt_mthd_dvcd]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 70 ,
						margin	: '3 0 3 0',
						hidden	: (_global.options.insp_item_ctq ==0),
						items	: [
							{	text	: 'CTQ항목', xtype : 'label', style : 'text-align:center;'
							},{	xtype	: 'lookupfield',
								margin	: '2 2 2 2',
								name	: 'ctq_sbsc_yorn',
								lookupValue	: resource.lookup('yorn'),
								value		: "0",
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=msmt_mthd_dvcd]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 80 ,
						margin	: '3 0 3 0',
						items	: [
							{	text	: '측정방법', xtype : 'label', style : 'text-align:center;'
							},{	xtype	: 'lookupfield',
								margin	: '2 2 2 2',
								editable: false,
								name	: 'msmt_mthd_dvcd',
								lookupValue	: resource.lookup('msmt_mthd_dvcd'),
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=cvic_name]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 150 ,
						margin	: '3 0 3 0',
						items	: [
							{	text		: '측정도구' , xtype : 'label',	style : 'text-align:center;'
							},{	xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								margin		: '2 2 2 2',
								name		: 'cvic_name',
								pair		: 'insp_cvic_idcd',
								editable	: false ,
								enableKeyEvents: true ,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=rslt_iput_dvcd]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								},
								popup		: {
									widget	: 'lookup-cvic-popup',
									values	: { },
									option	: { direct_result	: true },
									params	: {	stor_grp		: _global.stor_grp,
												stor_id			: _global.stor_id,
												line_stat		: '0',
												cvic_kind_dvcd	: '4000'
									},
									result	: function(records, nameField, pairField) {
										var panel = nameField.up('form');
										nameField.setValue(records[0].get('cvic_name'));
										pairField.setValue(records[0].get('cvic_idcd'));
									},
									create : function (self ) {
										Ext.merge( self.popup.values , {
											brcd : self.getValue()
										});
									}
								}
							},{	name	: 'insp_cvic_idcd'		, xtype : 'textfield', hidden : true
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 80 ,
						margin	: '3 0 3 0',
						hidden	: (_global.options.insp_item_mthd ==0),
						items	: [
							{	text	: '검사방법', xtype : 'label',style:"text-align: right" , style : 'text-align:center;'
							},{	xtype	: 'lookupfield',
								margin	: '2 2 2 2',
								name	: 'insp_mthd_dvcd',
								lookupValue	: resource.lookup('insp_mthd_dvcd'),
								value		: "2000",
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=insp_levl]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer',
							layout	: { type: 'vbox', align: 'stretch' } ,
							style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
							margin	: '3 0 3 0',
							width	: 60,
							hidden	: (_global.options.insp_item_levl ==0),
							items	: [
								{	text		: '검사수준', xtype : 'label', style : 'text-align:center;'
								},{	xtype		: 'textfield',
									name		: 'insp_levl',
									margin		: '2 2 2 2',
									enableKeyEvents : true,
									emptyText	: 'n=2',
									listeners	: {
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER) {
												var panel = self.up('form');
												panel.down('[name=lott_judt_stnd]').focus(true, 10);
											} else if (e.keyCode == e.ESC) {
												me.attachItem({ clear : true });
											}
										}
									}
								}
							]
					},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 65,
						hidden	: (_global.options.insp_item_lot ==0),
						items	: [
							{	text		: 'lot판정기준', xtype : 'label', style : 'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'lott_judt_stnd',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								emptyText	: 'AQL-1.5',
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=rslt_iput_dvcd]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						width	: 70 ,
						margin	: '3 0 3 0',
						items	: [
							{	text	: '입력구분', xtype : 'label',style:"text-align: right" , style : 'text-align:center;'
							},{	xtype	: 'lookupfield',
								margin	: '2 2 2 2',
								name	: 'rslt_iput_dvcd',
								lookupValue	: resource.lookup('rslt_iput_dvcd'),
								value		: "1000",
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=remk_text]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								},
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 70,
//						hidden	: (_global.options.insp_item_goal ==0),
						items	: [
							{	text	: '목표수준', xtype : 'label', style:'text-align:center;'
							},{	xtype	: 'textfield',
								name	: 'goal_levl',
								margin	: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=uppr_valu]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 70,
//						hidden	: (_global.options.insp_item_uppr ==0),
						items	: [
							{	text		: '상한값', xtype : 'label',style:  'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'uppr_valu',
								margin		: '2 2 2 2',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=lwlt_valu]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer' ,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 70,
//						hidden	: (_global.options.insp_item_lwlt ==0),
						items	: [
							{	text		: '하한값', xtype : 'label',style:  'text-align:center;'
							},{	xtype		: 'textfield',
								name		: 'lwlt_valu',
								margin		: '2 2 2 2',
								enableKeyEvents: true  ,
								listeners	:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=remk_text]').focus(true, 10);
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldcontainer'  ,
						hidden	: false,
						layout	: { type: 'vbox', align: 'stretch' } ,
						style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right,
						margin	: '3 0 3 0',
						width	: 220,
						items	: [
							{	text		: '메모', xtype : 'label'	, style:  'text-align:center;'
							},{	xtype		: 'textfield',
								margin		: '2 2 2 2',
								name		: 'remk_text',
								flex		: 100,
								maxLengthText: '한글 100자 이내로 작성하여 주십시오.',
								enableKeyEvents: true  ,
								listeners	:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
												value = panel.down('[name=insp_sbsc_name]').getValue()
											;
											if (value.trim() != '') {
												me.appendItem({});
											}
										} else if (e.keyCode == e.ESC) {
											me.attachItem({ clear : true });
										}
									}
								}
							}
						]
					}
				]
			}
		;
		return line;
	},

	createLine2 : function () {
		var me = this,
			line = {
				xtype	: 'container',
				margin	: '0 0 0 0',
				itemId	: 'itemviewer',
				layout	: 'border',
				border	: 1,
				style	: Const.borderLine.top +  Const.borderLine.bottom ,
				height	: 35,
				html	: ''
			}
		;
		return line;
	},

	/**
	 * 항목 데이터를 조회한다.
	 */
	selectItem : function (config) {
		var me		= this,
			panel	= config.panel,
			length	= config.records.length
		;
		Ext.each(config.records, function(record, index) {
			me.attachItem( { panel : config.panel , record : record , append : (length > 1) } );
		});
	},

	/**
	 * 항목 정보를 첨부 시킨다.
	 */
	attachItem : function (config) {
		var me = this,
			clear	= config.clear,
			record	= config.record
//			html	= config.html || ''
		;
		if (config.clear || !config.record) {
			html	= '';
			me.getForm().reset();
//			me.down('#itemviewer').update( html );
		} else {
			me.down('[name=insp_sbsc_name]'	).setValue(record.get('insp_sbsc_name' ));
			me.down('[name=insp_cond]'		).setValue(record.get('insp_cond' ));
			me.down('[name=ctq_sbsc_yorn]'	).setValue(record.get('ctq_sbsc_yorn' ));
			me.down('[name=insp_cvic_idcd]'	).setValue(record.get('insp_cvic_idcd' ));
			me.down('[name=cvic_name]'		).setValue(record.get('cvic_name' ));
			me.down('[name=rslt_iput_dvcd]'	).setValue(record.get('rslt_iput_dvcd' ));
			me.down('[name=goal_levl]'		).setValue(record.get('goal_levl' ));
			me.down('[name=uppr_valu]'		).setValue(record.get('uppr_valu' ));
			me.down('[name=lwlt_valu]'		).setValue(record.get('lwlt_valu' ));
			me.down('[name=remk_text]'		).setValue(record.get('remk_text'));
			me.down('[name=insp_mthd_dvcd]'	).setValue(record.get('insp_mthd_dvcd'));
			me.down('[name=insp_levl]'		).setValue(record.get('insp_levl'));
			me.down('[name=lotty_judt_stnd]').setValue(record.get('lotty_judt_stnd'));

		}
	},

	/**
	 * 입력된 상품을 등록한다.
	 */
	appendItem : function (config) {
		var me			= this,
			store		= me.ownerCt.getStore(),
			editor		= me.ownerCt.editor,
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			uper_seqn   = undefined
		;
		var seq = editor.getSEQ();

		record = Ext.create( store.model.modelName , {
			line_seqn			: seq,
			insp_sbsc_name		: me.down('[name=insp_sbsc_name]').getValue(),
			insp_cond			: me.down('[name=insp_cond]').getValue(),
			ctq_sbsc_yorn		: me.down('[name=ctq_sbsc_yorn]').getValue(),
			insp_cvic_idcd		: me.down('[name=insp_cvic_idcd]').getValue(),
			cvic_name			: me.down('[name=cvic_name]').getValue(),
			rslt_iput_dvcd		: me.down('[name=rslt_iput_dvcd]').getValue(),
			goal_levl			: me.down('[name=goal_levl]').getValue(),
			uppr_valu			: me.down('[name=uppr_valu]').getValue(),
			lwlt_valu			: me.down('[name=lwlt_valu]').getValue(),
			remk_text			: me.down('[name=remk_text]').getValue(),
			insp_mthd_dvcd		: me.down('[name=insp_mthd_dvcd]').getValue(),
			insp_levl			: me.down('[name=insp_levl]').getValue(),
			msmt_mthd_dvcd		: me.down('[name=msmt_mthd_dvcd]').getValue(),
			lott_judt_stnd		: me.down('[name=lott_judt_stnd]').getValue(),
			});

			store.each(function(findrecord) {
			if (   findrecord.get('insp_sbsc_name') == record.get('insp_sbsc_name')
				&& findrecord.get('base_name') == record.get('base_name')
				&& findrecord.get('insp_cond') == record.get('insp_cond')
				&& findrecord.get('ctq_sbsc_yorn') == record.get('ctq_sbsc_yorn')
				&& findrecord.get('insp_cvic_idcd') == record.get('insp_cvic_idcd')
				&& findrecord.get('cvic_name') == record.get('cvic_name')
				&& findrecord.get('rslt_iput_dvcd') == record.get('rslt_iput_dvcd')
				&& findrecord.get('uppr_valu') == record.get('uppr_valu')
				&& findrecord.get('lwlt_valu') == record.get('lwlt_valu')
				&& findrecord.get('remk_text') == record.get('remk_text')) {
				is_equal = true;
			}
		});
		// 상품을 추가
		if (!is_equal) {
			store.add(record);
		}

		me.attachItem({ clear : true });
	}
});
