import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import Logo from "../../assets/logo/logo.png";

const Navbar = ({ cartItems, setCartItems }) => {
  const [open, setOpen] = useState(true);

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="bg-light-900 px-6">
      <nav
        aria-label="Global"
        className="flex items-center justify-between sm:px-4 lg:px-8 py-5"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <img alt="" src={Logo} className="h-15" />
          </a>
        </div>
        <div>
          <div>
            <button
              onClick={() => setOpen(true)}
              className="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-2xl text-gray-900 hover:bg-gray-950/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              {totalQuantity > 0 && (
                <span className="absolute top-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {totalQuantity}
                </span>
              )}
            </button>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
              <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
              />

              <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                    <DialogPanel
                      transition
                      className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                    >
                      <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between">
                            <DialogTitle className="text-lg font-medium text-gray-900">
                              Cart
                            </DialogTitle>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon
                                  aria-hidden="true"
                                  className="size-6"
                                />
                              </button>
                            </div>
                          </div>
                          <div className="flex-1 overflow-y-auto p-4">
                            <ul>
                              {cartItems.map((item) => (
                                <li
                                  key={item._id}
                                  className="flex justify-between mb-4"
                                >
                                  <div>
                                    <p>{item.name}</p>
                                    <p>Qty: {item.quantity}</p>
                                  </div>
                                  <div>
                                    <p>${item.price * item.quantity}</p>
                                    <button
                                      onClick={() => removeFromCart(item._id)}
                                      className="text-red-500 text-sm"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="border-t p-4">
                          <div className="flex justify-between font-medium">
                            <p>Total</p>
                            <p>${totalAmount}</p>
                          </div>
                          <button className="mt-4 w-full bg-neutral-500 text-white py-2 rounded hover:bg-neutral-400">
                            Checkout
                          </button>
                        </div>
                      </div>
                    </DialogPanel>
                  </div>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
