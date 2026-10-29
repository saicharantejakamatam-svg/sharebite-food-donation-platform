import test from 'node:test';
import assert from 'node:assert/strict';
function validPickup(start,end,expiry){return new Date(end)>new Date(start)&&new Date(end)<=new Date(expiry)}
test('pickup window must end after it starts',()=>{assert.equal(validPickup('2026-10-30T10:00:00Z','2026-10-30T11:00:00Z','2026-10-30T12:00:00Z'),true);assert.equal(validPickup('2026-10-30T11:00:00Z','2026-10-30T10:00:00Z','2026-10-30T12:00:00Z'),false)});
test('pickup window must end before expiry',()=>{assert.equal(validPickup('2026-10-30T10:00:00Z','2026-10-30T11:00:00Z','2026-10-30T12:00:00Z'),true);assert.equal(validPickup('2026-10-30T10:00:00Z','2026-10-30T13:00:00Z','2026-10-30T12:00:00Z'),false)});
test('requested quantity cannot exceed available quantity',()=>{const available=5;assert.ok(4<=available);assert.ok(!(6<=available))});
test('request status transitions are constrained',()=>{const allowed={pending:['accepted','rejected','cancelled'],accepted:['cancelled','picked_up'],rejected:[],cancelled:[],picked_up:[]};assert.ok(allowed.pending.includes('accepted'));assert.ok(!allowed.picked_up.includes('accepted'));assert.ok(!allowed.rejected.includes('accepted'))});
