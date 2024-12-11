﻿using System.Server.Data;
using System.Server.IServices;
using System.Server.Models;
using System.Server.Models.DTO;
using System.Server.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace System.Server.Services
{
    public class OrderService : IOrderService
    {

        private readonly SystemContext _context;
        public OrderService(SystemContext context)
        { 
            _context = context; 
        }

        public async Task<IEnumerable<OrderGetDTO>> GetAllOrders()
        {
            var orders = await _context.Orders.ToListAsync();
            var orderList = new List<OrderGetDTO>();
            var n = orders.Count;
            for (int i = 0; i < n; i++)
            {
                orderList.Add(await GetOrderById(orders[i].Id));
            }
            return orderList;
        }
        public async Task<OrderGetDTO> GetOrderById(long id)
        {
            var order =  await _context.Orders.FindAsync(id);
            if (order == null)
            {
                throw new KeyNotFoundException($"Order with ID {id} not found.");
            }
            var newOrder = new OrderGetDTO
            {
                Id = order.Id,
                Status = order.Status,
                Tip = order.Tip,
                ReservationId = order.ReservationId,
                Payments = null
            };
            var orderProducts = await _context.OrderProducts
                .Where(p => p.OrderId == order.Id)
                .ToListAsync();
            var newProducts = new List<OrderGetProductDTO>();
            var n = orderProducts.Count;
            for (int i = 0; i < n; i++)
            {
                var product = await _context.Products
                    .FindAsync(orderProducts[i].ProductId);
                newProducts.Add(new OrderGetProductDTO
                { 
                    Id = product.Id,
                    Name = product.Name,
                    Price = product.Price,
                    Quantity = orderProducts[i].Quantity,
                    DiscountId = product.DiscountId
                });
            }
            newOrder.Products = newProducts;

            return newOrder;
        }
        public async Task CreateOrder(OrderPostDTO order)
        {
            var newOrder = new Order
            {
                UserId = order.UserId,
                DiscountId = order.DiscountId,
                ReservationId = order.ReservationId,
                Tip = order.Tip,
                Status = OrderStatus.Open
            };
            _context.Orders.Add(newOrder);
            await _context.SaveChangesAsync();

            var n = order.Products.Count;
            for (int i = 0; i < n; i++)
            {
                var orderProduct = new OrderProduct
                {
                    OrderId = newOrder.Id,
                    ProductId = order.Products[i].ProductId,
                    Quantity = order.Products[i].Quantity
                };
                _context.OrderProducts.Add(orderProduct);
            }
            await _context.SaveChangesAsync();
        }
        
        public async Task UpdateOrder(long id, Order order)
        {
            var existingOrder = await _context.Orders.FindAsync(id);
            if (existingOrder != null)
            {
                existingOrder.UserId = order.UserId;
                existingOrder.DiscountId = order.DiscountId;
                existingOrder.ReservationId = order.ReservationId;
                existingOrder.Tip = order.Tip;
                existingOrder.Status = order.Status;
            }
            await _context.SaveChangesAsync();
        }

        public async Task DeleteOrder(long id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order != null)
            {
                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
            }
            
        }
    }
}
